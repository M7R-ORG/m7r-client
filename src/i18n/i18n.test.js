import fs from 'fs'
import path from 'path'
import { createIntl } from 'react-intl'
import en from './locales/en'
import ru from './locales/ru'

const srcDir = path.join(__dirname, '..')
const localesDir = path.join(__dirname, 'locales')

const isDescriptor = (node) => typeof node?.id === 'string' && 'defaultMessage' in node

function collectDescriptors(node, prefix = []) {
  return Object.entries(node).flatMap(([key, value]) =>
    isDescriptor(value)
      ? [{ path: [...prefix, key].join('.'), descriptor: value }]
      : collectDescriptors(value, [...prefix, key])
  )
}

function argumentNames(message) {
  const names = Array.from(message.matchAll(/\{\s*(\w+)\s*[,}]/g), ([, name]) => name)

  return [...new Set(names)].sort()
}

function formatErrors(locale, id, message) {
  const errors = []
  const intl = createIntl({
    locale,
    defaultLocale: locale,
    messages: { [id]: message },
    onError: (error) => errors.push(error.message)
  })
  const values = Object.fromEntries(argumentNames(message).map((name) => [name, 1]))

  intl.formatMessage({ id }, values)

  return errors
}

function sourceFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      return fullPath === localesDir ? [] : sourceFiles(fullPath)
    }

    return /\.jsx?$/.test(entry.name) && !entry.name.endsWith('.test.js') ? [fullPath] : []
  })
}

const descriptors = collectDescriptors(en)
const enIds = descriptors.map(({ descriptor }) => descriptor.id)

describe('translations', () => {
  it('uses the object path as the message id', () => {
    const mismatched = descriptors.filter(({ path: key, descriptor }) => key !== descriptor.id)

    expect(mismatched).toEqual([])
  })

  it('has unique ids', () => {
    expect(new Set(enIds).size).toBe(enIds.length)
  })

  it('has the same keys in ru as in en', () => {
    const ruIds = Object.keys(ru)

    expect(enIds.filter((id) => !ruIds.includes(id))).toEqual([])
    expect(ruIds.filter((id) => !enIds.includes(id))).toEqual([])
  })

  it('has valid ICU messages with the same arguments in every language', () => {
    descriptors.forEach(({ descriptor: { id, defaultMessage } }) => {
      expect({ id, errors: formatErrors('en', id, defaultMessage) }).toEqual({ id, errors: [] })
      expect({ id, errors: formatErrors('ru', id, ru[id]) }).toEqual({ id, errors: [] })
      expect({ id, args: argumentNames(ru[id]) }).toEqual({
        id,
        args: argumentNames(defaultMessage)
      })
    })
  })

  it('references only existing messages in the source code', () => {
    const broken = sourceFiles(srcDir).flatMap((file) => {
      const content = fs.readFileSync(file, 'utf8')
      const references = content.matchAll(/\btranslations((?:\.[A-Za-z_$][\w$]*)+)(\[)?/g)

      return Array.from(references)
        .filter(([, keyPath, dynamicAccess]) => {
          const target = keyPath
            .slice(1)
            .split('.')
            .reduce((node, key) => node?.[key], en)

          return dynamicAccess ? !target || isDescriptor(target) : !isDescriptor(target)
        })
        .map(([reference]) => `${path.relative(srcDir, file)}: ${reference}`)
    })

    expect(broken).toEqual([])
  })
})

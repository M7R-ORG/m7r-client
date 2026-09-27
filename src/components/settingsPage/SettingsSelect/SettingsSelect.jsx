import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { keyboardKey } from '../../../constants/system'
import { ArrowIcon, CheckIcon } from '../../common/Icon/_exports'
import './SettingsSelect.scss'

const optionHeight = 42
const optionsOffset = 16

function SettingsSelect({ className = '', options = [], value = '', onChange = () => {} }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenUp, setIsOpenUp] = useState(false)
  const selectRef = useRef(null)

  const selectedOption = options.find((option) => option.value === value)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleClickOutside = (event) => {
      if (!selectRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === keyboardKey.escape) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleHandler = () => {
    if (!isOpen) {
      const { bottom } = selectRef.current.getBoundingClientRect()
      const optionsHeight = options.length * optionHeight + optionsOffset

      setIsOpenUp(window.innerHeight - bottom < optionsHeight)
    }

    setIsOpen((open) => !open)
  }

  const selectHandler = (optionValue) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div
      className={`c-settings-select ${className} ${isOpen ? 'open' : ''} ${isOpenUp ? 'up' : ''}`}
      ref={selectRef}
    >
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleHandler}
      >
        <span className="select-value">{selectedOption?.label}</span>
        <ArrowIcon className="select-arrow" />
      </button>

      {isOpen && (
        <div className="select-options" role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => selectHandler(option.value)}
              >
                <span>{option.label}</span>
                {isSelected && <CheckIcon className="select-check" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

SettingsSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
}

export default SettingsSelect

import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchFilter } from '../../../../constants/system'

const isValidFilter = (value) => Object.values(searchFilter).includes(value)

const useSearchQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const rawFilter = searchParams.get('type') || searchFilter.all
  const filter = isValidFilter(rawFilter) ? rawFilter : searchFilter.all

  const updateParams = useCallback(
    (mutate) => {
      const params = new URLSearchParams(searchParams)
      mutate(params)
      setSearchParams(params, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const setQuery = useCallback(
    (next) =>
      updateParams((params) => {
        if (next) {
          params.set('q', next)
        } else {
          params.delete('q')
        }
      }),
    [updateParams]
  )

  const setFilter = useCallback(
    (next) =>
      updateParams((params) => {
        if (next && next !== searchFilter.all) {
          params.set('type', next)
        } else {
          params.delete('type')
        }
      }),
    [updateParams]
  )

  return { query, filter, setQuery, setFilter }
}

export default useSearchQueryParams

import { useCallback, useEffect } from 'react'
import api from '../../../../api/api'
import useSearchSection from './useSearchSection'

const useSearchResults = ({ debouncedQuery, showPeople, showChannels, pageSize }) => {
  const mapPeople = useCallback(
    (res) => ({
      items: res?.data?.accounts || [],
      pagesCount: res?.data?.meta?.pagesCount || 0
    }),
    []
  )

  const mapChannels = useCallback(
    (res) => ({
      items: res?.data?.channels || [],
      pagesCount: res?.data?.meta?.pagesCount || 0
    }),
    []
  )

  const people = useSearchSection({
    fetchPage: api.account.accounts,
    mapResponse: mapPeople,
    query: debouncedQuery,
    pageSize
  })

  const channels = useSearchSection({
    fetchPage: api.channel.publicChannels,
    mapResponse: mapChannels,
    query: debouncedQuery,
    pageSize
  })

  const { loadInitial: loadPeople, reset: resetPeople } = people
  const { loadInitial: loadChannels, reset: resetChannels } = channels

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    const sections = [
      [showPeople, loadPeople, resetPeople],
      [showChannels, loadChannels, resetChannels]
    ]

    Promise.all(
      sections.map(([active, loadInitial, reset]) => {
        if (active) {
          return loadInitial({ signal })
        }
        reset()
        return Promise.resolve()
      })
    )

    return () => controller.abort()
  }, [
    debouncedQuery,
    showPeople,
    showChannels,
    pageSize,
    loadPeople,
    loadChannels,
    resetPeople,
    resetChannels
  ])

  const isLoading = people.isLoading || channels.isLoading

  return { people, channels, isLoading }
}

export default useSearchResults

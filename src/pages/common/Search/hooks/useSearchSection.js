import { useCallback, useEffect, useRef, useState } from 'react'

const searchStatus = {
  idle: 'idle',
  loading: 'loading',
  loadingMore: 'loadingMore',
  ready: 'ready'
}

const initialState = { items: [], page: 0, pagesCount: 0, status: searchStatus.idle }

const canLoadMore = ({ status, page, pagesCount }) =>
  status === searchStatus.ready && page + 1 < pagesCount

const useSearchSection = ({ fetchPage, mapResponse, query, pageSize }) => {
  const [state, setState] = useState(initialState)
  const stateRef = useRef(state)
  const loadingMoreRef = useRef(false)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  const reset = useCallback(() => {
    loadingMoreRef.current = false
    setState(initialState)
  }, [])

  const loadInitial = useCallback(
    async ({ signal }) => {
      setState((s) => ({ ...s, status: searchStatus.loading, page: 0 }))

      const res = await fetchPage({ pageNumber: 0, pageSize, searchField: query, signal })

      if (signal?.aborted) {
        return
      }

      const { items, pagesCount } = mapResponse(res)
      setState({ items, pagesCount, page: 0, status: searchStatus.ready })
    },
    [fetchPage, mapResponse, query, pageSize]
  )

  const loadMore = useCallback(async () => {
    const snapshot = stateRef.current
    if (!canLoadMore(snapshot) || loadingMoreRef.current) {
      return
    }

    loadingMoreRef.current = true

    try {
      setState((s) => ({ ...s, status: searchStatus.loadingMore, page: s.page + 1 }))

      const res = await fetchPage({
        pageNumber: snapshot.page + 1,
        pageSize,
        searchField: query
      })

      const mapped = mapResponse(res)
      setState((s) => ({
        ...s,
        items: [...s.items, ...mapped.items],
        pagesCount: mapped.pagesCount || s.pagesCount,
        status: searchStatus.ready
      }))
    } finally {
      loadingMoreRef.current = false
    }
  }, [fetchPage, mapResponse, query, pageSize])

  return {
    items: state.items,
    pagesCount: state.pagesCount,
    isLoading: state.status === searchStatus.loading,
    isLoadingMore: state.status === searchStatus.loadingMore,
    hasMore: state.page + 1 < state.pagesCount,
    loadInitial,
    loadMore,
    reset
  }
}

export default useSearchSection

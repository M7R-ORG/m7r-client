import { useCallback, useEffect } from 'react'

const shouldLoadMore = ({ enabled, hasMore, isLoadingMore }) =>
  enabled && hasMore && !isLoadingMore

const computeNearBottom = (element, threshold) => {
  const targetHeight = element.getBoundingClientRect().height
  return element.scrollHeight - (element.scrollTop + targetHeight) < threshold
}

const useInfiniteScroll = ({
  containerRef,
  enabled,
  hasMore,
  isLoading,
  isLoadingMore,
  itemsCount,
  onLoadMore,
  threshold = 300
}) => {
  const onScroll = useCallback(
    (event) => {
      if (!enabled) {
        return
      }

      if (
        computeNearBottom(event.target, threshold) &&
        shouldLoadMore({ enabled, hasMore, isLoadingMore })
      ) {
        onLoadMore()
      }
    },
    [enabled, hasMore, isLoadingMore, onLoadMore, threshold]
  )

  useEffect(() => {
    if (isLoading || !shouldLoadMore({ enabled, hasMore, isLoadingMore })) {
      return
    }

    const container = containerRef.current
    if (container && container.scrollHeight <= container.clientHeight) {
      onLoadMore()
    }
  }, [
    containerRef,
    enabled,
    hasMore,
    isLoading,
    isLoadingMore,
    itemsCount,
    onLoadMore
  ])

  return { onScroll }
}

export default useInfiniteScroll

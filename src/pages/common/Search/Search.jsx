import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchFilter } from '../../../constants/system'
import { useDebounce } from '../../../hooks/_exports'
import {
  useSearchQueryParams,
  useSearchResults,
  useOpenChat,
  useInfiniteScroll
} from './hooks/_exports'
import SearchInput from '../../../components/searchPage/SearchInput/SearchInput'
import SearchFilter from '../../../components/searchPage/SearchFilter/SearchFilter'
import SearchSection from '../../../components/searchPage/SearchSection/SearchSection'
import PersonRow from '../../../components/searchPage/SearchResultRow/PersonRow'
import ChannelRow from '../../../components/searchPage/SearchResultRow/ChannelRow'
import './Search.scss'

const allPageSize = 5
const tabPageSize = 10

const noop = () => {}

const filterOptions = [
  { value: searchFilter.all, label: 'All' },
  { value: searchFilter.people, label: 'People' },
  { value: searchFilter.channels, label: 'Channels' }
]

function Search() {
  const navigate = useNavigate()
  const bodyRef = useRef(null)
  const { query, filter, setQuery, setFilter } = useSearchQueryParams()
  const debouncedQuery = useDebounce(query, 400)

  const showPeople = filter === searchFilter.all || filter === searchFilter.people
  const showChannels = filter === searchFilter.all || filter === searchFilter.channels
  const showHeaders = filter === searchFilter.all
  const pageSize = filter === searchFilter.all ? allPageSize : tabPageSize

  const { people, channels, isLoading } = useSearchResults({
    debouncedQuery,
    showPeople,
    showChannels,
    pageSize
  })
  const { openPerson, openChannel } = useOpenChat()

  const sectionByFilter = {
    [searchFilter.people]: people,
    [searchFilter.channels]: channels
  }
  const activeSection = sectionByFilter[filter] ?? null
  const onLoadMore = activeSection?.loadMore ?? noop

  const { onScroll } = useInfiniteScroll({
    containerRef: bodyRef,
    enabled: filter !== searchFilter.all,
    hasMore: activeSection?.hasMore || false,
    isLoading,
    isLoadingMore: activeSection?.isLoadingMore || false,
    itemsCount: activeSection?.items.length || 0,
    onLoadMore
  })

  const onSearchKeyDown = (event) => {
    if (event.key !== 'Escape') {
      return
    }
    if (query) {
      setQuery('')
    } else {
      navigate(-1)
    }
  }

  const isQueryInSync = debouncedQuery === query
  const isInitialEmpty =
    isQueryInSync && !isLoading && people.items.length === 0 && channels.items.length === 0

  const renderPersonRow = useCallback(
    (person) => (
      <PersonRow key={person.id} person={person} onOpen={() => openPerson(person)} />
    ),
    [openPerson]
  )

  const renderChannelRow = useCallback(
    (channel) => (
      <ChannelRow key={channel.id} channel={channel} onOpen={() => openChannel(channel)} />
    ),
    [openChannel]
  )

  return (
    <div className="p-search">
      <div className="search-container">
        <div className="search-header">
          <SearchInput
            value={query}
            placeholder="Search people, channels…"
            ariaLabel="Search people and channels"
            autoFocus
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery('')}
            onKeyDown={onSearchKeyDown}
          />
          <SearchFilter value={filter} options={filterOptions} onChange={setFilter} />
        </div>

        <div
          ref={bodyRef}
          className={`search-body ${isLoading ? 'is-loading' : ''}`}
          onScroll={onScroll}
        >
          {isLoading && <div className="loading-bar" />}

          <SearchSection
            title="People"
            items={people.items}
            showHeader={showHeaders}
            hasMore={people.hasMore}
            isLoadingMore={people.isLoadingMore}
            onSeeAll={() => setFilter(searchFilter.people)}
            renderRow={renderPersonRow}
          />

          <SearchSection
            title="Public channels"
            items={channels.items}
            showHeader={showHeaders}
            hasMore={channels.hasMore}
            isLoadingMore={channels.isLoadingMore}
            onSeeAll={() => setFilter(searchFilter.channels)}
            renderRow={renderChannelRow}
          />

          {isInitialEmpty && (
            <div className="status empty">
              {debouncedQuery
                ? `No results for «${debouncedQuery}»`
                : 'Nothing to show yet'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search

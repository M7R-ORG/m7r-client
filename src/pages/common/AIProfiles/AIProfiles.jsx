import { useCallback, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { PageHeader, Pagination } from '../../../components/_exports'
import Loader1 from '../../../components/common/Loader/Loader1/Loader1'
import ProfileItem from '../../../components/aiProfilesPage/AiProfileItem/AiProfileItem'
import { CreateIcon1 } from '../../../components/common/Icon/_exports'
import CreateAIProfileModal from '../../../components/aiProfilesPage/Modals/CreateAIProfileModal/CreateAIProfileModal'
import api from '../../../api/api'
import { translations } from '../../../i18n'
import './AIProfiles.scss'

const pageSize = 15

function AIProfiles() {
  const { formatMessage } = useIntl()
  const [isLoading, setIsLoading] = useState(false)
  const [profiles, setProfiles] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [isActiveCreateAIProfileModal, setIsActiveCreateAIProfileModal] = useState(false)
  const [editableProfile, setEditableProfile] = useState(null)

  const loadAIProfiles = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.aiProfile.getAll({
        pageNumber,
        pageSize
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      setProfiles(data.items || [])
      setPagesCount(data.meta?.pagesCount || 1)
    } catch (err) {
      // temp
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber])

  useEffect(() => {
    loadAIProfiles()
  }, [loadAIProfiles])

  const onNext = () => {
    if (pageNumber + 1 < pagesCount) {
      setPageNumber((number) => number + 1)
    }
  }

  const onPrev = () => {
    if (pageNumber > 0) {
      setPageNumber((number) => number - 1)
    }
  }

  const openUpdateModal = (profile) => {
    setEditableProfile(profile)
    setIsActiveCreateAIProfileModal(true)
  }

  useEffect(() => {
    if (!isActiveCreateAIProfileModal) {
      setEditableProfile(null)
    }
  }, [isActiveCreateAIProfileModal])

  return (
    <div className="p-ai-profiles">
      <CreateAIProfileModal
        setIsActive={setIsActiveCreateAIProfileModal}
        isActive={isActiveCreateAIProfileModal}
        refreshProfiles={loadAIProfiles}
        profile={editableProfile}
      />

      <PageHeader
        className="ai-profiles-header"
        text={formatMessage(translations.admin.aiProfiles.title)}
      >
        <div
          className="header-item new-profile-item"
          onClick={() => setIsActiveCreateAIProfileModal(true)}
          role="presentation"
        >
          <CreateIcon1 />
        </div>
      </PageHeader>

      <div className="ai-profiles-content">
        {isLoading ? (
          <Loader1 className="loader" />
        ) : (
          <table className="profiles-table">
            <thead className="table-head">
              <tr>
                <th width="6%" aria-label={formatMessage(translations.admin.table.image)}>
                  {}
                </th>
                <th width="5%">{formatMessage(translations.admin.table.id)}</th>
                <th width="10%">{formatMessage(translations.common.name)}</th>
                <th width="10%">{formatMessage(translations.admin.aiProfiles.model)}</th>
                <th width="10%">{formatMessage(translations.admin.aiProfiles.template)}</th>
                <th width="10%">{formatMessage(translations.admin.aiProfiles.temperature)}</th>
                <th width="10%">{formatMessage(translations.admin.aiProfiles.apiKey)}</th>
                <th width="5%" aria-label={formatMessage(translations.admin.table.tools)}>
                  {}
                </th>
              </tr>
            </thead>

            <tbody className="table-body">
              {profiles.map((profile) => (
                <ProfileItem
                  key={profile.id}
                  profileInfo={profile}
                  refreshProfiles={loadAIProfiles}
                  openUpdateModal={openUpdateModal}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        className="ai-profiles-pagination"
        pageNumber={pageNumber}
        pagesCount={pagesCount}
        onNext={onNext}
        onPrev={onPrev}
      />
    </div>
  )
}

export default AIProfiles

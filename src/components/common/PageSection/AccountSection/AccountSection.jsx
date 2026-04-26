import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { ArrowIcon, EmailIcon, FavoriteIcon, ProfileIcon, SendIcon } from '../../Icon/_exports'
import { usePageSection } from '../../../../hooks/_exports'
import Avatar from '../../Avatar/Avatar'
import Loader2 from '../../Loader/Loader2/Loader2'
import api from '../../../../api/api'
import { activityStatus, page } from '../../../../constants/system'
import formatLastOnlineAt from '../../../../utils/helpers/formatHelper'
import './AccountSection.scss'

const getActivityStatus = ({ status, lastOnlineAt }) => {
  const isOnline = status?.toLowerCase() === activityStatus.online

  const result = isOnline ? 'Online now' : formatLastOnlineAt(lastOnlineAt)

  return result
}

function AccountSection({ data }) {
  const { accountSection } = usePageSection()
  const [account, setAccount] = useState({})
  const [status, setStatus] = useState('')
  const [image, setImage] = useState(undefined)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const myAccountId = useSelector((state) => state.auth.info.id)

  const navigate = useNavigate()

  const accountId = data.id

  const isMyAccount = +myAccountId === accountId


  useEffect(() => {
    const { activityStatus: activityState, lastOnlineAt } = account

    if (activityStatus && lastOnlineAt) {
      setStatus(
        getActivityStatus({
          status: activityState,
          lastOnlineAt
        })
      )
    }
  }, [account])

  const onCloseClickHandler = () => {
    accountSection.close()
  }

  const onCLickDirectHandler = async () => {
    const { data: chatId } = await api.channel.setUpDirectChannel({
      partnerId: accountId
    })

    if (chatId) {
      navigate(`${page.chat}/${chatId}`)
    }
  }

  const onCLickFavoriteHandler = () => {
    setIsFavorite((favorite) => !favorite)
  }

  const loadAccount = async (id) => {
    setIsLoading(true)

    await Promise.all([
      api.account.accountById({ id })
        .then((result) => setAccount(result.data))
        .catch(),
      api.account.imageByAccountId({ id })
        .then((result) => setImage(result.data.image || null))
        .catch(() => setImage(null))
    ])

    setIsLoading(false)
  }

  useEffect(() => {
    loadAccount(accountId)
  }, [accountId])

  return (
    <div className="c-account-section">
      <div className="section-header">
        <div className="close-wrapper">
          <ArrowIcon className="close-icon" onClick={onCloseClickHandler} />
        </div>

        <div className="title">
          <p>Account Info</p>
        </div>
      </div>

      <div className="section-content visible">
        {isLoading ? (
          <div className="account-loader">
            <Loader2 />
          </div>
        ) : (
          <div className="account-info">
            <div className="image">
              <Avatar className="img-wrapper" image={image} name={account.login} isLazy />
            </div>

            <div className="login">{account.login || ''}</div>

            <div className="status">{status || ''}</div>

            <div className="actions">
              {!isMyAccount && (
                <div className="direct" onClick={onCLickDirectHandler} role="presentation">
                  <SendIcon />
                </div>
              )}

              {!isMyAccount && (
                <div className="favorite" onClick={onCLickFavoriteHandler} role="presentation">
                  <FavoriteIcon isActive={isFavorite} />
                </div>
              )}
            </div>

            <div className="additional-info">
              <div className="info-item">
                <div className="icon">
                  <EmailIcon className='email-icon'/>
                </div>
                <p>{account.email || ''}</p>
              </div>

              <div className="info-item">
                <div className="icon">
                  <ProfileIcon className='profile-icon'/>
                </div>
                <p>{account.role?.toLowerCase() || ''}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

AccountSection.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number
  })
}

export default AccountSection

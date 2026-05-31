import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../../api/api'
import { page } from '../../../../constants/system'

const useOpenChat = () => {
  const navigate = useNavigate()
  const openingRef = useRef(false)

  const runOnce = useCallback(async (action) => {
    if (openingRef.current) {
      return
    }
    openingRef.current = true
    try {
      await action()
    } finally {
      openingRef.current = false
    }
  }, [])

  const openPerson = useCallback(
    (person) =>
      runOnce(async () => {
        const { data: chatId } = await api.channel.setUpDirectChannel({
          partnerId: person.id
        })
        if (chatId) {
          navigate(`${page.chat}/${chatId}`)
        }
      }),
    [navigate, runOnce]
  )

  const openChannel = useCallback(
    (channel) =>
      runOnce(async () => {
        await api.channel.connect({ channelId: channel.id })
        navigate(`${page.chat}/${channel.id}`)
      }),
    [navigate, runOnce]
  )

  return { openPerson, openChannel }
}

export default useOpenChat

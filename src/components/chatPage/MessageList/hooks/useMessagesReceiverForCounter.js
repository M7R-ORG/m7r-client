import { useEffect } from 'react'
import { chatMethod } from '../../../../socket/hubHandlers'

const useMessagesReceiverForCounter = ({ chatId, chatHub }) => {
  useEffect(() => {
    if (chatHub && chatHub.isConnected) {
      chatHub.connection.on(chatMethod.sendMessageRes, (data) => {
        const { channelId } = data

        chatHub.connection.invoke(chatMethod.channel, { channelId })
      })
    }

    return () => {
      if (chatHub) {
        chatHub.connection.off(chatMethod.sendMessageRes)
      }
    }
  }, [chatHub, chatId])
}

export default useMessagesReceiverForCounter

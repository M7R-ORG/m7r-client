import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import signalR from '../socket/signalR'

const useSignalRHub = (hubName, action) => {
  const dispatch = useDispatch()
  const { isLogged, accessTokenExp } = useSelector((state) => state.auth.info)
  const connectionRef = useRef(signalR[hubName])
  const [isConnected, setIsConnected] = useState(false)

  const isTokenValid = accessTokenExp > Date.now()

  useEffect(() => {
    const connection = connectionRef.current

    if (isLogged && isTokenValid) {
      connection
        .start()
        .then(() => {
          setIsConnected(true)
        })
        .catch(() => {
          setIsConnected(false)
        })
    }

    return () => {
      connection.stop()
      setIsConnected(false)
    }
  }, [isLogged, isTokenValid, hubName])

  useEffect(() => {
    dispatch(
      action({
        connection: connectionRef.current,
        isConnected
      })
    )
  }, [dispatch, action, connectionRef, isConnected])
}

export default useSignalRHub

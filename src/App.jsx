import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './constants/system'
import useRefreshToken from './hooks/useRefreshToken'
import { setChatHub, setStateHub } from './redux/slices/signalRSlice'
import { useProfile } from './hooks/_exports'
import './App.scss'

function App() {
  const theme = useSelector((state) => state.system.theme)
  const accentColor = useSelector((state) => state.system.accentColor)

  useRefreshToken()
  useProfile()

  useSignalRHub(hub.state, setStateHub)
  useSignalRHub(hub.chat, setChatHub)

  return (
    <div className="app" data-theme={theme} data-accent={accentColor}>
      <AppRouter />
    </div>
  )
}

export default App

import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { role, page } from '../constants/system'
import {
  Chat,
  ConfirmedRegistration,
  Home,
  Login,
  Profile,
  Registration,
  Users,
  ResetPassword,
  InitResetPassword,
  AIProfiles,
  Settings,
  Search
} from '../pages/_exports'
import { RoutePermissionGuard, SidebarLayout } from '../components/_exports'

function AppRouter() {
  const isLogged = useSelector((state) => state.auth.info.isLogged)

  return <div className="app-router">{isLogged ? <LoggedRouter /> : <GuestRouter />}</div>
}

function LoggedRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.chat} />} />

      <Route element={<SidebarLayout />}>
        <Route element={<RoutePermissionGuard permittedRoles={[role.admin]} />}>
          <Route path="users" element={<Users />} />
        </Route>

        <Route
          element={<RoutePermissionGuard permittedRoles={[role.user, role.admin, role.aiBot]} />}
        >
          <Route path="home" element={<Home />} />
          <Route path="chat/:id?" element={<Chat />} />
          <Route path="ai-profiles" element={<AIProfiles />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Route>
    </Routes>
  )
}

function GuestRouter() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={page.login} />} />

      <Route element={<RoutePermissionGuard permittedRoles={[role.public]} />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
        <Route path="confirm-registration" element={<ConfirmedRegistration />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="init-reset-password" element={<InitResetPassword />} />
      </Route>
    </Routes>
  )
}

export default AppRouter

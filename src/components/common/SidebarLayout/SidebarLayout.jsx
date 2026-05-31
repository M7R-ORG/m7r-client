import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import PageLayout from '../../pageLayout/PageLayout'
import './SidebarLayout.scss'

function SidebarLayout() {
  return (
    <div className="c-sidebar-layout">
      <Sidebar />
      <PageLayout>
        <Outlet />
      </PageLayout>
    </div>
  )
}

export default SidebarLayout

import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Header />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
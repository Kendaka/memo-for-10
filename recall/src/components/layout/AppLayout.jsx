import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <header className="border-b border-zinc-800 px-8 py-5">
          <p className="text-sm text-zinc-400">
            Your personal knowledge workspace
          </p>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
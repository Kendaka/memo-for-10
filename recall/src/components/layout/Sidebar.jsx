import { NavLink } from 'react-router-dom'
import { House, LibraryBig, Inbox, Trash2 } from 'lucide-react'

function Sidebar() {
  const navigation = [
    { name: 'Home', path: '/', icon: House },
    { name: 'Library', path: '/library', icon: LibraryBig },
    { name: 'Inbox', path: '/inbox', icon: Inbox },
    { name: 'Trash', path: '/trash', icon: Trash2 },
  ]

   return (
    <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-900 p-5">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Recall<span className="text-indigo-400">.</span>
      </h1>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`
              }
            >
              <Icon size={19} />
              <span>{item.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
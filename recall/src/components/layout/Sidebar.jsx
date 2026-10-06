import { NavLink } from 'react-router-dom'

function Sidebar() {
  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Library', path: '/library' },
    { name: 'Inbox', path: '/inbox' },
    { name: 'Trash', path: '/trash' },
  ]

  return (
    <aside className="w-60 shrink-0 border-r border-zinc-800 bg-zinc-900 p-5">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Recall<span className="text-indigo-400">.</span>
      </h1>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 transition-colors ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
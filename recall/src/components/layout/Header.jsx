import { Search, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-8">

      <div>
        <p className="text-sm text-zinc-400">
          Your personal knowledge workspace
        </p>
      </div>

        <Link
      to="/search"
      className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-indigo-500 hover:text-white"
    >
      <Search size={17} />

      <span>Search notes...</span>

      <kbd className="ml-6 hidden rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500 sm:inline">
        Search
      </kbd>
    </Link>
    </header>
  )
}

export default Header
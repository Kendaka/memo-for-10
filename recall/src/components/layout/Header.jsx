import { Search, Plus } from 'lucide-react'

function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-8">

      <div>
        <p className="text-sm text-zinc-400">
          Your personal knowledge workspace
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          disabled
          className="flex items-center gap-3 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 opacity-60"
        >
          <Search size={18} />
          <span>Search</span>
          <span className="ml-6 text-xs text-zinc-500">
            Ctrl K
          </span>
        </button>

        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white opacity-60"
        >
          <Plus size={18} />
          New
        </button>

      </div>
    </header>
  )
}

export default Header

import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'

function Header() {
  const navigate = useNavigate()

  // Ctrl + K opens Search from anywhere in Recall.
  useEffect(() => {
    function handleKeyDown(event) {
      const isSearchShortcut =
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === 'k'

      if (isSearchShortcut) {
        event.preventDefault()
        navigate('/search')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-8">
      <Link
        to="/search"
        className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-indigo-500 hover:text-white"
      >
        <Search size={18} />

        <span>Search notes...</span>

        <kbd className="ml-6 hidden rounded border border-zinc-700 px-2 py-0.5 text-xs text-zinc-500 sm:inline">
          Ctrl K
        </kbd>
      </Link>

      <Link
        to="/inbox"
        className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
      >
        <Plus size={18} />
        New Note
      </Link>
    </header>
  )
}

export default Header

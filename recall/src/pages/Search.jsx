
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, FileText } from 'lucide-react'

import { loadSubjects } from './storage/subjectStorage'
import { loadTopics } from './storage/topicStorage'
import { loadNotes } from './storage/noteStorage'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const normalizedQuery = query.trim().toLowerCase()

  // Load the latest saved data.
  const subjects = loadSubjects()
  const topics = loadTopics()
  const notes = loadNotes()

  // Determine whether a note belongs to Inbox.
  function isInboxNote(note) {
    return note.subjectId == null && note.topicId == null
  }

  // Get the correct location and URL for a note.
  function getNoteLocation(note) {
    if (isInboxNote(note)) {
      return {
        valid: true,
        label: 'Inbox',
        path: `/inbox/${note.id}`,
      }
    }

    const subject = subjects.find(
      (item) =>
        item.id === note.subjectId &&
        !item.deletedAt
    )

    const topic = topics.find(
      (item) =>
        item.id === note.topicId &&
        item.subjectId === note.subjectId &&
        !item.deletedAt
    )

    // Exclude notes whose parent is missing or deleted.
    if (!subject || !topic) {
      return {
        valid: false,
        label: '',
        path: '',
      }
    }

    return {
      valid: true,
      label: `${subject.name} / ${topic.name}`,
      path: `/library/${subject.id}/${topic.id}/${note.id}`,
    }
  }

  // Search active Library and Inbox notes.
  const results = normalizedQuery
    ? notes
        .filter((note) => {
          // Never show deleted notes.
          if (note.deletedAt) return false

          const location = getNoteLocation(note)

          // Exclude notes inside unavailable folders.
          if (!location.valid) return false

          // Combine all block content into one string.
          const blockContent = (note.blocks ?? [])
            .map((block) => block.content ?? '')
            .join(' ')

          // Search title, content, blocks, and location.
          const searchableText = [
            note.title ?? '',
            note.content ?? '',
            blockContent,
            location.label,
          ]
            .join(' ')
            .toLowerCase()

          return searchableText.includes(normalizedQuery)
        })
        .map((note) => {
          const location = getNoteLocation(note)

          // Prefer displaying a block containing the search term.
          const matchingBlock = (note.blocks ?? []).find(
            (block) =>
              (block.content ?? '')
                .toLowerCase()
                .includes(normalizedQuery)
          )

          // Otherwise, display the first available content.
          const firstBlock = (note.blocks ?? []).find(
            (block) => block.content?.trim()
          )

          const preview =
            matchingBlock?.content ||
            note.content ||
            firstBlock?.content ||
            ''

          return {
            ...note,
            location,
            preview,
          }
        })
    : []

  function handleSearch(event) {
    const value = event.target.value

    setSearchParams(
      value ? { q: value } : {},
      { replace: true }
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Page heading */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Search.
        </h1>

        <p className="mt-2 text-zinc-400">
          Find anything you've written in Recall.
        </p>
      </div>

      {/* Search input */}
      <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 focus-within:border-indigo-500">
        <SearchIcon
          size={20}
          className="text-zinc-400"
        />

        <input
          autoFocus
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search your notes..."
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      {/* Result count */}
      {normalizedQuery && (
        <p className="text-sm text-zinc-400">
          {results.length} result(s) found
        </p>
      )}

      {/* Search results */}
      <div className="space-y-3">
        {results.map((note) => (
          <Link
            key={note.id}
            to={note.location.path}
            className="block rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-indigo-500"
          >
            <div className="mb-2 flex items-center gap-2">
              <FileText
                size={18}
                className="text-indigo-400"
              />

              <h2 className="font-semibold text-white">
                {note.title || 'Untitled Note'}
              </h2>
            </div>

            {/* Subject / Topic or Inbox */}
            <p className="text-xs text-zinc-500">
              {note.location.label}
            </p>

            {/* Content preview */}
            {note.preview && (
              <p className="mt-3 line-clamp-2 whitespace-pre-wrap text-sm text-zinc-400">
                {note.preview}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* Initial empty state */}
      {!normalizedQuery && (
        <div className="py-12 text-center text-zinc-500">
          Start typing to search your knowledge.
        </div>
      )}

      {/* No results */}
      {normalizedQuery && results.length === 0 && (
        <div className="py-12 text-center text-zinc-500">
          No matching notes found.
        </div>
      )}

    </div>
  )
}

export default Search

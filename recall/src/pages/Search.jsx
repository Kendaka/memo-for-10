import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, FileText } from 'lucide-react'

import { loadSubjects } from '../storage/subjectStorage'
import { loadTopics } from '../storage/topicStorage'
import { loadNotes } from '../storage/noteStorage'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const [subjects] = useState(loadSubjects)
  const [topics] = useState(loadTopics)
  const [notes] = useState(loadNotes)

  const normalizedQuery = query.trim().toLowerCase()

  const results = normalizedQuery
    ? notes.filter((note) => {
        if (note.deletedAt) return false

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

        if (!subject || !topic) return false

        const blockContent = (note.blocks ?? [])
          .map((block) => block.content ?? '')
          .join(' ')

        const searchableText = [
          note.title,
          note.content ?? '',
          blockContent,
          subject.name,
          topic.name,
        ]
          .join(' ')
          .toLowerCase()

        return searchableText.includes(normalizedQuery)
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
      <div>
        <h1 className="text-3xl font-bold text-white">
          Search.
        </h1>

        <p className="mt-2 text-zinc-400">
          Find anything you've written in Recall.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 focus-within:border-indigo-500">
        <SearchIcon size={20} className="text-zinc-400" />

        <input
          autoFocus
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search your notes..."
          className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
        />
      </div>

      {normalizedQuery && (
        <p className="text-sm text-zinc-400">
          {results.length} result(s) found
        </p>
      )}

      <div className="space-y-3">
        {results.map((note) => {
          const subject = subjects.find(
            (item) => item.id === note.subjectId
          )

          const topic = topics.find(
            (item) => item.id === note.topicId
          )

          const matchingBlock = (note.blocks ?? []).find(
            (block) =>
              (block.content ?? '')
                .toLowerCase()
                .includes(normalizedQuery)
          )

          const preview =
            matchingBlock?.content ??
            note.content ??
            ''

          return (
            <Link
              key={note.id}
              to={`/library/${note.subjectId}/${note.topicId}/${note.id}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-indigo-500"
            >
              <div className="mb-2 flex items-center gap-2">
                <FileText size={18} className="text-indigo-400" />

                <h2 className="font-semibold text-white">
                  {note.title}
                </h2>
              </div>

              <p className="text-xs text-zinc-500">
                {subject?.name} / {topic?.name}
              </p>

              {preview && (
                <p className="mt-3 line-clamp-2 whitespace-pre-wrap text-sm text-zinc-400">
                  {preview}
                </p>
              )}
            </Link>
          )
        })}
      </div>

      {!normalizedQuery && (
        <div className="py-12 text-center text-zinc-500">
          Start typing to search your knowledge.
        </div>
      )}

      {normalizedQuery && results.length === 0 && (
        <div className="py-12 text-center text-zinc-500">
          No matching notes found.
        </div>
      )}
    </div>
  )
}

export default Search
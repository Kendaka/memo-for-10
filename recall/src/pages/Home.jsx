
import { Link } from 'react-router-dom'
import {
  LibraryBig,
  Folder,
  FileText,
  Inbox,
  ArrowRight,
  Plus,
  Clock3,
} from 'lucide-react'

import { loadSubjects } from './storage/subjectStorage'
import { loadTopics } from './storage/topicStorage'
import { loadNotes } from './storage/noteStorage'

function Home() {
  const subjects = loadSubjects().filter(
    (subject) => !subject.deletedAt
  )

  const allTopics = loadTopics()
  const allNotes = loadNotes()

  const activeSubjectIds = new Set(
    subjects.map((subject) => subject.id)
  )

  const topics = allTopics.filter(
    (topic) =>
      !topic.deletedAt &&
      activeSubjectIds.has(topic.subjectId)
  )

  const activeTopicIds = new Set(
    topics.map((topic) => topic.id)
  )

  function isInboxNote(note) {
    return note.subjectId == null && note.topicId == null
  }

  // Exclude deleted notes and notes in deleted folders.
  const notes = allNotes.filter((note) => {
    if (note.deletedAt) return false

    if (isInboxNote(note)) return true

    return (
      activeSubjectIds.has(note.subjectId) &&
      activeTopicIds.has(note.topicId)
    )
  })

  const inboxNotes = notes.filter(isInboxNote)

  // Sort by most recently edited.
  const recentNotes = [...notes]
    .sort((a, b) => {
      const dateA = new Date(
        a.updatedAt || a.createdAt || 0
      ).getTime()

      const dateB = new Date(
        b.updatedAt || b.createdAt || 0
      ).getTime()

      return dateB - dateA
    })
    .slice(0, 5)

  function getNoteLocation(note) {
    if (isInboxNote(note)) {
      return {
        label: 'Inbox',
        path: `/inbox/${note.id}`,
      }
    }

    const subject = subjects.find(
      (item) => item.id === note.subjectId
    )

    const topic = topics.find(
      (item) =>
        item.id === note.topicId &&
        item.subjectId === note.subjectId
    )

    return {
      label: `${subject?.name || 'Subject'} / ${topic?.name || 'Topic'}`,
      path: `/library/${note.subjectId}/${note.topicId}/${note.id}`,
    }
  }

  function formatDate(dateString) {
    if (!dateString) return 'Recently added'

    const date = new Date(dateString)

    if (Number.isNaN(date.getTime())) {
      return 'Recently added'
    }

    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const stats = [
    {
      label: 'Subjects',
      value: subjects.length,
      icon: LibraryBig,
      path: '/library',
    },
    {
      label: 'Topics',
      value: topics.length,
      icon: Folder,
      path: '/library',
    },
    {
      label: 'Notes',
      value: notes.length,
      icon: FileText,
      path: '/library',
    },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Hi Kendrick<span className="text-indigo-400">.</span>
        </h1>

        <p className="mt-3 text-zinc-400">
          Welcome back to your knowledge space.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <Link
              key={stat.label}
              to={stat.path}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-indigo-500/50"
            >
              <Icon
                size={23}
                className="mb-5 text-indigo-400"
              />

              <p className="text-3xl font-bold text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                {stat.label}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/inbox"
          className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-indigo-500/50"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-indigo-500/10 p-3">
              <Plus
                size={22}
                className="text-indigo-400"
              />
            </div>

            <div>
              <p className="font-semibold text-white">
                Capture an idea
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                Create a note in your Inbox
              </p>
            </div>
          </div>

          <ArrowRight
            size={19}
            className="text-zinc-500"
          />
        </Link>

        <Link
          to="/inbox"
          className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-indigo-500/50"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-indigo-500/10 p-3">
              <Inbox
                size={22}
                className="text-indigo-400"
              />
            </div>

            <div>
              <p className="font-semibold text-white">
                Review Inbox
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                {inboxNotes.length} unorganized{' '}
                {inboxNotes.length === 1 ? 'note' : 'notes'}
              </p>
            </div>
          </div>

          <ArrowRight
            size={19}
            className="text-zinc-500"
          />
        </Link>
      </div>

      {/* Recent notes */}
      <section className="space-y-5">
        <div className="flex items-center gap-3">
          <Clock3
            size={21}
            className="text-indigo-400"
          />

          <h2 className="text-xl font-semibold text-white">
            Recent Notes
          </h2>
        </div>

        {recentNotes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-10 text-center">
            <FileText
              size={30}
              className="mx-auto text-zinc-600"
            />

            <p className="mt-4 text-zinc-400">
              No notes yet. Start capturing what you learn.
            </p>

            <Link
              to="/inbox"
              className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300"
            >
              Create your first note
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentNotes.map((note) => {
              const location = getNoteLocation(note)

              return (
                <Link
                  key={note.id}
                  to={location.path}
                  className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-indigo-500/50"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <FileText
                      size={20}
                      className="shrink-0 text-indigo-400"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {note.title || 'Untitled Note'}
                      </p>

                      <p className="mt-1 truncate text-sm text-zinc-500">
                        {location.label}
                      </p>
                    </div>
                  </div>

                  <div className="hidden shrink-0 items-center gap-3 sm:flex">
                    <span className="text-xs text-zinc-500">
                      {formatDate(
                        note.updatedAt || note.createdAt
                      )}
                    </span>

                    <ArrowRight
                      size={17}
                      className="text-zinc-500"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default Home

import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Plus, BookOpen } from 'lucide-react'
import { loadSubjects } from '../storage/subjectStorage'

function Subject() {
  const { subjectId } = useParams()

  const subjects = loadSubjects()

  const subject = subjects.find(
    (item) => item.id === subjectId
  )

  if (!subject) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Subject not found.
        </h1>

        <Link
          to="/library"
          className="text-indigo-400 hover:underline"
        >
          Back to Library
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <Link
        to="/library"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Library
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {subject.name}
          </h1>

          <p className="mt-2 text-zinc-400">
            Organize your knowledge into topics.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-white opacity-60"
        >
          <Plus size={18} />
          New Topic
        </button>
      </div>

      <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">
        <BookOpen
          size={32}
          className="mx-auto mb-4 text-zinc-500"
        />

        <h2 className="font-semibold">
          No topics yet
        </h2>

        <p className="mt-2 text-sm text-zinc-400">
          Your topics will appear here.
        </p>
      </div>

    </div>
  )
}

export default Subject
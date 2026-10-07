import { useState } from 'react'
import { Plus, BookOpen } from 'lucide-react'
import { saveSubjects, loadSubjects } from '../storage/subjectStorage'

function Library() {
  const [subjects, setSubjects] = useState(loadSubjects)
  const [subjectName, setSubjectName] = useState('')

  function handleCreateSubject(event) {
  event.preventDefault()

  const name = subjectName.trim()

  if (!name) return

  const newSubject = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: new Date().toISOString(),
  }

  const updatedSubjects = [...subjects, newSubject]

  setSubjects(updatedSubjects)
  saveSubjects(updatedSubjects)

  setSubjectName('')
}

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Your Library.
        </h1>

        <p className="mt-2 text-zinc-400">
          Organize your knowledge into subjects.
        </p>
      </div>

      {/* Create Subject Form */}
      <form
        onSubmit={handleCreateSubject}
        className="flex gap-3"
      >
        <input
          type="text"
          value={subjectName}
          onChange={(event) => setSubjectName(event.target.value)}
          placeholder="Enter subject name..."
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white hover:bg-indigo-600"
        >
          <Plus size={18} />
          Create
        </button>
      </form>

      {/* Subjects */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <BookOpen
              size={24}
              className="mb-4 text-indigo-400"
            />

            <h2 className="font-semibold text-white">
              {subject.name}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              No topics yet
            </p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Library
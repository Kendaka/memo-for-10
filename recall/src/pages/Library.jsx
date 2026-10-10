import { useState } from 'react'
import { Plus, BookOpen, Pencil, Trash2 } from 'lucide-react'
import { saveSubjects, loadSubjects } from '../storage/subjectStorage'
import { loadTopics, saveTopics } from '../storage/topicStorage'
import { loadNotes, saveNotes } from '../storage/noteStorage'
import { Link } from 'react-router-dom'

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

function handleRenameSubject(subject) {
  const newName = window.prompt(
    'Rename subject:',
    subject.name
  )

  if (newName === null) return

  const name = newName.trim()

  if (!name) return

  const updatedSubjects = subjects.map((item) =>
    item.id === subject.id
      ? { ...item, name }
      : item
  )

    setSubjects(updatedSubjects)
    saveSubjects(updatedSubjects)
  }

  function handleDeleteSubject(subject) {
    const confirmed = window.confirm(
      `Permanently delete "${subject.name}" and all its topics and notes?`
    )

    if (!confirmed) return

    const updatedSubjects = subjects.filter(
      (item) => item.id !== subject.id
    )

    const updatedTopics = loadTopics().filter(
      (topic) => topic.subjectId !== subject.id
    )

    const updatedNotes = loadNotes().filter(
      (note) => note.subjectId !== subject.id
    )

    saveTopics(updatedTopics)
    saveNotes(updatedNotes)
    saveSubjects(updatedSubjects)
    setSubjects(updatedSubjects)
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
            <Link
              to={`/library/${subject.id}`}
              className="block"
            >
              <BookOpen
                size={24}
                className="mb-4 text-indigo-400"
              />

              <h2 className="font-semibold text-white">
                {subject.name}
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Open subject
              </p>
            </Link>

            <div className="mt-5 flex gap-2 border-t border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => handleRenameSubject(subject)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
              >
                <Pencil size={15} />
                Rename
              </button>

              <button
                type="button"
                onClick={() => handleDeleteSubject(subject)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Library
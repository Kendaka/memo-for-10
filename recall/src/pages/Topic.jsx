import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, FileText } from 'lucide-react'

import { loadTopics } from '../storage/topicStorage'
import { loadNotes, saveNotes } from '../storage/noteStorage'

function Topic() {
  const { subjectId, topicId } = useParams()
  const navigate = useNavigate()

  const topic = loadTopics().find(
    (item) => item.id === topicId && item.subjectId === subjectId
  )

  const [notes, setNotes] = useState(loadNotes)

  const topicNotes = notes.filter(
    (note) => note.topicId === topicId &&
              note.subjectId === subjectId
  )

  function handleCreateNote() {
    if (!topic) return

    const newNote = {
      id: crypto.randomUUID(),
      subjectId,
      topicId,
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedNotes = [...notes, newNote]

    setNotes(updatedNotes)
    saveNotes(updatedNotes)

    navigate(`/library/${subjectId}/${topicId}/${newNote.id}`)
  }

  if (!topic) {
    return <p className="text-zinc-400">Topic not found.</p>
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">

      <Link
        to={`/library/${subjectId}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Subject
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{topic.name}</h1>
          <p className="mt-2 text-zinc-400">
            Notes inside this topic.
          </p>
        </div>

        <button
          onClick={handleCreateNote}
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          <Plus size={18} />
          New Note
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topicNotes.map((note) => (
          <Link
            key={note.id}
            to={`/library/${subjectId}/${topicId}/${note.id}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 hover:border-indigo-500"
          >
            <FileText size={24} className="mb-4 text-indigo-400" />
            <h2 className="font-semibold">{note.title}</h2>
          </Link>
        ))}
      </div>

      {topicNotes.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-10 text-center text-zinc-400">
          No notes yet. Create your first note.
        </div>
      )}

    </div>
  )
}

export default Topic
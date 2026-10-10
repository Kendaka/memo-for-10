import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { loadNotes, saveNotes } from '../storage/noteStorage'

function Note() {
  const { subjectId, topicId, noteId } = useParams()

  const [notes, setNotes] = useState(loadNotes)

  const note = notes.find(
    (item) =>
      item.id === noteId &&
      item.topicId === topicId &&
      item.subjectId === subjectId
  )

  function updateNote(field, value) {
    const updatedNotes = notes.map((item) =>
      item.id === noteId
        ? {
            ...item,
            [field]: value,
            updatedAt: new Date().toISOString(),
          }
        : item
    )

    setNotes(updatedNotes)
    saveNotes(updatedNotes)
  }

  if (!note) {
    return <p className="text-zinc-400">Note not found.</p>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      <Link
        to={`/library/${subjectId}/${topicId}`}
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Topic
      </Link>

      <input
        type="text"
        value={note.title}
        onChange={(event) => updateNote('title', event.target.value)}
        placeholder="Untitled Note"
        className="w-full bg-transparent text-4xl font-bold text-white outline-none"
      />

      <textarea
        value={note.content}
        onChange={(event) => updateNote('content', event.target.value)}
        placeholder="Start writing..."
        className="min-h-96 w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 p-6 leading-7 text-zinc-200 outline-none focus:border-indigo-500"
      />

      <p className="text-xs text-zinc-500">
        Changes are saved automatically in this browser.
      </p>

    </div>
  )
}

export default Note
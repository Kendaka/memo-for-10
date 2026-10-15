import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, FileText, Trash2, FolderInput } from 'lucide-react'

import { loadNotes, saveNotes } from '../storage/noteStorage'
import { loadSubjects } from '../storage/subjectStorage'
import { loadTopics } from '../storage/topicStorage'
import { moveNoteToTrash } from '../storage/trashStorage'

function Inbox() {
  const navigate = useNavigate()

  const [notes, setNotes] = useState(loadNotes)
  const [organizingId, setOrganizingId] = useState(null)
  const [selectedSubjectId, setSelectedSubjectId] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState('')

  const subjects = loadSubjects().filter(
    (subject) => !subject.deletedAt
  )

  const topics = loadTopics().filter(
    (topic) => !topic.deletedAt
  )

  const inboxNotes = notes.filter(
    (note) =>
      note.subjectId == null &&
      note.topicId == null &&
      !note.deletedAt
  )

  const availableTopics = topics.filter(
    (topic) => topic.subjectId === selectedSubjectId
  )

  function handleCreateNote() {
    const now = new Date().toISOString()

    const newNote = {
      id: crypto.randomUUID(),
      subjectId: null,
      topicId: null,
      title: 'Untitled Note',
      blocks: [],
      createdAt: now,
      updatedAt: now,
    }

    const updatedNotes = [...notes, newNote]

    saveNotes(updatedNotes)
    setNotes(updatedNotes)

    navigate(`/inbox/${newNote.id}`)
  }

  function handleDeleteNote(note) {
    const confirmed = window.confirm(
      `Move "${note.title}" to Trash?`
    )

    if (!confirmed) return

    moveNoteToTrash(note.id)
    setNotes(loadNotes())
  }

  function handleOrganizeNote(noteId) {
    if (!selectedSubjectId || !selectedTopicId) return

    const topicExists = topics.some(
      (topic) =>
        topic.id === selectedTopicId &&
        topic.subjectId === selectedSubjectId
    )

    if (!topicExists) return

    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            subjectId: selectedSubjectId,
            topicId: selectedTopicId,
            updatedAt: new Date().toISOString(),
          }
        : note
    )

    saveNotes(updatedNotes)
    setNotes(updatedNotes)

    setOrganizingId(null)
    setSelectedSubjectId('')
    setSelectedTopicId('')
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Inbox.
          </h1>

          <p className="mt-2 text-zinc-400">
            Capture now. Organize later.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNote}
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          <Plus size={18} />
          New Note
        </button>
      </div>

      {inboxNotes.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
          Your Inbox is empty. Capture your first idea.
        </div>
      )}

      <div className="space-y-4">
        {inboxNotes.map((note) => (
          <div
            key={note.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <Link
              to={`/inbox/${note.id}`}
              className="flex items-center gap-3 hover:text-indigo-400"
            >
              <FileText size={20} className="text-indigo-400" />

              <span className="font-medium">
                {note.title}
              </span>
            </Link>

            <div className="mt-4 flex gap-3 border-t border-zinc-800 pt-4">
              <button
                type="button"
                onClick={() => {
                  setOrganizingId(note.id)
                  setSelectedSubjectId('')
                  setSelectedTopicId('')
                }}
                className="flex items-center gap-2 text-sm text-indigo-400"
              >
                <FolderInput size={16} />
                Organize
              </button>

              <button
                type="button"
                onClick={() => handleDeleteNote(note)}
                className="flex items-center gap-2 text-sm text-red-400"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {organizingId === note.id && (
              <div className="mt-4 space-y-3 rounded-lg border border-zinc-800 p-4">
                <select
                  value={selectedSubjectId}
                  onChange={(event) => {
                    setSelectedSubjectId(event.target.value)
                    setSelectedTopicId('')
                  }}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white"
                >
                  <option value="">Choose a subject</option>

                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedTopicId}
                  onChange={(event) =>
                    setSelectedTopicId(event.target.value)
                  }
                  disabled={!selectedSubjectId}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white disabled:opacity-50"
                >
                  <option value="">Choose a topic</option>

                  {availableTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!selectedTopicId}
                  onClick={() => handleOrganizeNote(note.id)}
                  className="rounded-lg bg-indigo-500 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                  Move to Topic
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Inbox
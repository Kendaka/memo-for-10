import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { loadNotes, saveNotes } from '../storage/noteStorage'
import NoteBlock from '../components/notes/NoteBlock'
import { loadSubjects } from '../storage/subjectStorage'
import { loadTopics } from '../storage/topicStorage'
import { moveNoteToTrash } from '../storage/trashStorage'

const blockTypes = [
  { type: 'purpose', label: 'Purpose' },
  { type: 'keyIdea', label: 'Key Idea' },
  { type: 'explanation', label: 'Explanation' },
  { type: 'code', label: 'Code' },
  { type: 'example', label: 'Example' },
  { type: 'math', label: 'Math' },
  { type: 'question', label: 'Question' },
  { type: 'text', label: 'Text' },
]

function Note() {
  const { subjectId, topicId, noteId } = useParams()
  const navigate = useNavigate()
  const [notes, setNotes] = useState(loadNotes)
  const [showBlockMenu, setShowBlockMenu] = useState(false)

  const subject = loadSubjects().find(
    (item) => item.id === subjectId && !item.deletedAt
  )

  const topic = loadTopics().find(
    (item) =>
      item.id === topicId &&
      item.subjectId === subjectId &&
      !item.deletedAt
  )

  const note = notes.find(
    (item) =>
      item.id === noteId &&
      item.topicId === topicId &&
      item.subjectId === subjectId &&
      !item.deletedAt
  )

  function updateNote(changes) {
    const updatedNotes = notes.map((item) =>
      item.id === noteId
        ? {
            ...item,
            ...changes,
            updatedAt: new Date().toISOString(),
          }
        : item
    )

    setNotes(updatedNotes)
    saveNotes(updatedNotes)
  }

  function addBlock(type) {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      content: '',
    }

    updateNote({
      blocks: [...(note.blocks ?? []), newBlock],
    })

    setShowBlockMenu(false)
  }

  function updateBlock(blockId, content) {
    const updatedBlocks = (note.blocks ?? []).map((block) =>
      block.id === blockId
        ? { ...block, content }
        : block
    )

    updateNote({ blocks: updatedBlocks })
  }

  function deleteBlock(blockId) {
    const updatedBlocks = (note.blocks ?? []).filter(
      (block) => block.id !== blockId
    )

    updateNote({ blocks: updatedBlocks })
  }

  if (!subject || !topic || !note) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Note unavailable.
        </h1>

        <p className="text-zinc-400">
          This note or one of its parent folders may be in Trash.
        </p>

        <Link to="/trash" className="text-indigo-400">
          Open Trash
        </Link>
      </div>
    )
  }

  function handleDeleteNote() {
    const confirmed = window.confirm(
        `Move "${note.title}" to Trash?`
      )

      if (!confirmed) return

      moveNoteToTrash(note.id)

      navigate(`/library/${subjectId}/${topicId}`)
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

      <button
        type="button"
        onClick={handleDeleteNote}
        className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
      >
        <Trash2 size={16} />
        Delete Note
      </button>

      <input
        type="text"
        value={note.title}
        onChange={(event) =>
          updateNote({ title: event.target.value })
        }
        placeholder="Untitled Note"
        className="w-full bg-transparent text-4xl font-bold text-white outline-none"
      />

      {/* Preserve content from older notes */}
      {note.content && !note.blocks?.length && (
        <div className="rounded-xl border border-amber-900/50 bg-zinc-900 p-5">
          <p className="mb-2 text-xs text-amber-400">
            Previous note content
          </p>

          <p className="whitespace-pre-wrap text-zinc-300">
            {note.content}
          </p>

          <p className="mt-3 text-xs text-zinc-500">
            Copy this text into a new block before removing it.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {(note.blocks ?? []).map((block) => (
          <NoteBlock
            key={block.id}
            block={block}
            onChange={(content) =>
              updateBlock(block.id, content)
            }
            onDelete={() => deleteBlock(block.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowBlockMenu(!showBlockMenu)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 p-4 text-zinc-400 hover:border-indigo-500 hover:text-indigo-400"
      >
        <Plus size={18} />
        Add Block
      </button>

      {showBlockMenu && (
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-3 sm:grid-cols-4">
          {blockTypes.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => addBlock(item.type)}
              className="rounded-lg border border-zinc-800 px-3 py-3 text-sm text-zinc-300 hover:border-indigo-500 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-zinc-500">
        Changes are saved automatically in this browser.
      </p>

    </div>
  )
}

export default Note
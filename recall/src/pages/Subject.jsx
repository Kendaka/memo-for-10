import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Folder,
  Pencil,
  Trash2
} from 'lucide-react'

import { loadSubjects } from '../storage/subjectStorage'
import { loadTopics, saveTopics } from '../storage/topicStorage'
import { loadNotes, saveNotes } from '../storage/noteStorage'
import { moveTopicToTrash } from '../storage/trashStorage'

function Subject() {
  const { subjectId } = useParams()

  const subjects = loadSubjects()
  const subject = subjects.find(
    (item) => item.id === subjectId
  )

  const [topics, setTopics] = useState(loadTopics)
  const [topicName, setTopicName] = useState('')

  const subjectTopics = topics.filter(
    (topic) => topic.subjectId === subjectId
  )

  function handleCreateTopic(event) {
    event.preventDefault()

    const name = topicName.trim()

    if (!name || !subject) return

    const newTopic = {
      id: crypto.randomUUID(),
      subjectId: subjectId,
      name: name,
      createdAt: new Date().toISOString(),
    }

    const updatedTopics = [...topics, newTopic]

    setTopics(updatedTopics)
    saveTopics(updatedTopics)
    setTopicName('')
  }

  function handleRenameTopic(topic) {
    const newName = window.prompt(
      'Rename topic:',
      topic.name
    )

    if (newName === null) return

    const name = newName.trim()

    if (!name) return

    const updatedTopics = topics.map((item) =>
      item.id === topic.id
        ? { ...item, name }
        : item
    )

    setTopics(updatedTopics)
    saveTopics(updatedTopics)
  }

  function handleDeleteTopic(topic) {
    const confirmed = window.confirm(
      `Move "${topic.name}" to Trash?`
    )

    if (!confirmed) return

    moveTopicToTrash(topic.id)

    setTopics(loadTopics())
  }
  if (!subject) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">
          Subject not found.
        </h1>

        <Link to="/library" className="text-indigo-400">
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

      <div>
        <h1 className="text-3xl font-bold">
          {subject.name}
        </h1>

        <p className="mt-2 text-zinc-400">
          Organize your knowledge into topics.
        </p>
      </div>

      {/* Create Topic */}
      <form
        onSubmit={handleCreateTopic}
        className="flex gap-3"
      >
        <input
          type="text"
          value={topicName}
          onChange={(event) => setTopicName(event.target.value)}
          placeholder="Enter topic name..."
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
        />

        <button
          type="submit"
          className="flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 font-medium text-white hover:bg-indigo-600"
        >
          <Plus size={18} />
          Create Topic
        </button>
      </form>

      {/* Topic Cards */}
      {/* Topic Cards */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {subjectTopics.map((topic) => (
    <div
      key={topic.id}
      className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <Link
        to={`/library/${subjectId}/${topic.id}`}
        className="block"
      >
        <Folder
          size={24}
          className="mb-4 text-indigo-400"
        />

        <h2 className="font-semibold text-white">
          {topic.name}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Open topic
        </p>
      </Link>

      <div className="mt-5 flex gap-2 border-t border-zinc-800 pt-4">
          <button
            type="button"
            onClick={() => handleRenameTopic(topic)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <Pencil size={15} />
            Rename
          </button>

          <button
            type="button"
            onClick={() => handleDeleteTopic(topic)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

      {subjectTopics.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 p-10 text-center">
          <BookOpen
            size={30}
            className="mx-auto mb-4 text-zinc-500"
          />

          <p className="text-zinc-400">
            No topics yet. Create your first topic above.
          </p>
        </div>
      )}

    </div>
  )
}

export default Subject
import { useState } from 'react'
import { RotateCcw, Trash2 } from 'lucide-react'

import { loadSubjects, saveSubjects } from '../storage/subjectStorage'
import { loadTopics, saveTopics } from '../storage/topicStorage'
import { loadNotes, saveNotes } from '../storage/noteStorage'

function Trash() {
  const [subjects, setSubjects] = useState(loadSubjects)
  const [topics, setTopics] = useState(loadTopics)
  const [notes, setNotes] = useState(loadNotes)

  const deletedSubjects = subjects.filter((item) => item.deletedAt)
  const deletedTopics = topics.filter((item) => item.deletedAt)
  const deletedNotes = notes.filter((item) => item.deletedAt)

  function restoreSubject(id) {
    const updated = subjects.map((item) =>
      item.id === id
        ? { ...item, deletedAt: null }
        : item
    )

    saveSubjects(updated)
    setSubjects(updated)
  }

    function restoreTopic(id) {
    const topic = topics.find((item) => item.id === id)

    const parentExists = subjects.some(
        (subject) =>
        subject.id === topic?.subjectId &&
        !subject.deletedAt
    )

    if (!parentExists) {
        window.alert('Restore the parent subject first.')
        return
    }

    const updated = topics.map((item) =>
        item.id === id
        ? { ...item, deletedAt: null }
        : item
    )

    saveTopics(updated)
    setTopics(updated)
    }

    function restoreNote(id) {
    const note = notes.find((item) => item.id === id)

    const subjectExists = subjects.some(
        (subject) =>
        subject.id === note?.subjectId &&
        !subject.deletedAt
    )

    const topicExists = topics.some(
        (topic) =>
        topic.id === note?.topicId &&
        topic.subjectId === note?.subjectId &&
        !topic.deletedAt
    )

    if (!subjectExists || !topicExists) {
        window.alert('Restore the parent subject and topic first.')
        return
    }

    const updated = notes.map((item) =>
        item.id === id
        ? { ...item, deletedAt: null }
        : item
    )

    saveNotes(updated)
    setNotes(updated)
    }

  function permanentlyDelete(type, id) {
    const confirmed = window.confirm(
      'Permanently delete this item? This cannot be undone.'
    )

    if (!confirmed) return

    if (type === 'subject') {
      const updatedSubjects = subjects.filter((item) => item.id !== id)
      const updatedTopics = topics.filter((item) => item.subjectId !== id)
      const updatedNotes = notes.filter((item) => item.subjectId !== id)

      saveSubjects(updatedSubjects)
      saveTopics(updatedTopics)
      saveNotes(updatedNotes)

      setSubjects(updatedSubjects)
      setTopics(updatedTopics)
      setNotes(updatedNotes)
    }

    if (type === 'topic') {
      const updatedTopics = topics.filter((item) => item.id !== id)
      const updatedNotes = notes.filter((item) => item.topicId !== id)

      saveTopics(updatedTopics)
      saveNotes(updatedNotes)

      setTopics(updatedTopics)
      setNotes(updatedNotes)
    }

    if (type === 'note') {
      const updatedNotes = notes.filter((item) => item.id !== id)

      saveNotes(updatedNotes)
      setNotes(updatedNotes)
    }
  }

  const sections = [
    { title: 'Subjects', type: 'subject', items: deletedSubjects, restore: restoreSubject },
    { title: 'Topics', type: 'topic', items: deletedTopics, restore: restoreTopic },
    { title: 'Notes', type: 'note', items: deletedNotes, restore: restoreNote },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Trash.</h1>
        <p className="mt-2 text-zinc-400">
          Restore or permanently delete your items.
        </p>
      </div>

      {sections.map((section) => (
        <section key={section.type} className="space-y-3">
          <h2 className="text-lg font-semibold">{section.title}</h2>

          {section.items.length === 0 ? (
            <p className="text-sm text-zinc-500">No deleted {section.title.toLowerCase()}.</p>
          ) : (
            section.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <span>{item.name ?? item.title}</span>

                <div className="flex gap-2">
                  <button
                    onClick={() => section.restore(item.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-indigo-400 hover:bg-zinc-800"
                  >
                    <RotateCcw size={16} />
                    Restore
                  </button>

                  <button
                    onClick={() => permanentlyDelete(section.type, item.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                    Delete Forever
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      ))}
    </div>
  )
}

export default Trash
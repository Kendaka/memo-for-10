import { loadSubjects, saveSubjects } from './subjectStorage'
import { loadTopics, saveTopics } from './topicStorage'
import { loadNotes, saveNotes } from './noteStorage'

export function moveSubjectToTrash(subjectId) {
  const subjects = loadSubjects()

  saveSubjects(
    subjects.map((subject) =>
      subject.id === subjectId
        ? { ...subject, deletedAt: new Date().toISOString() }
        : subject
    )
  )
}

export function moveTopicToTrash(topicId) {
  const topics = loadTopics()

  saveTopics(
    topics.map((topic) =>
      topic.id === topicId
        ? { ...topic, deletedAt: new Date().toISOString() }
        : topic
    )
  )
}

export function moveNoteToTrash(noteId) {
  const notes = loadNotes()

  saveNotes(
    notes.map((note) =>
      note.id === noteId
        ? { ...note, deletedAt: new Date().toISOString() }
        : note
    )
  )
}
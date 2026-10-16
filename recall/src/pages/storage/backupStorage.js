
import { loadSubjects, saveSubjects } from './subjectStorage'
import { loadTopics, saveTopics } from './topicStorage'
import { loadNotes, saveNotes } from './noteStorage'

export function exportBackup() {
  const backup = {
    app: 'Recall',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      subjects: loadSubjects(),
      topics: loadTopics(),
      notes: loadNotes(),
    },
  }

  const json = JSON.stringify(backup, null, 2)

  const blob = new Blob([json], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `recall-backup-${new Date().toISOString().slice(0, 10)}.json`

  document.body.appendChild(link)
  link.click()
  link.remove()

  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function importBackup(file) {
  const text = await file.text()
  const backup = JSON.parse(text)

  if (
    backup?.app !== 'Recall' ||
    backup?.version !== 1 ||
    !Array.isArray(backup?.data?.subjects) ||
    !Array.isArray(backup?.data?.topics) ||
    !Array.isArray(backup?.data?.notes)
  ) {
    throw new Error('Invalid Recall backup file.')
  }

  const confirmed = window.confirm(
    'Importing this backup will REPLACE all existing Recall data, including Trash. Continue?'
  )

  if (!confirmed) return false

  saveSubjects(backup.data.subjects)
  saveTopics(backup.data.topics)
  saveNotes(backup.data.notes)

  return true
}

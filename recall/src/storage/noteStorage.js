const NOTES_KEY = 'recall_notes'

export function loadNotes() {
  const saved = localStorage.getItem(NOTES_KEY)

  if (!saved) return []

  return JSON.parse(saved)
}

export function saveNotes(notes) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

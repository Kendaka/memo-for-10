const SUBJECTS_KEY = 'recall_subjects'

export function saveSubjects(subjects) {
  localStorage.setItem(
    SUBJECTS_KEY,
    JSON.stringify(subjects)
  )
}

export function loadSubjects() {
  const savedSubjects = localStorage.getItem(SUBJECTS_KEY)

  if (!savedSubjects) {
    return []
  }

  return JSON.parse(savedSubjects)
}
const TOPICS_KEY = 'recall_topics'

export function loadTopics() {
  const savedTopics = localStorage.getItem(TOPICS_KEY)

  if (!savedTopics) {
    return []
  }

  return JSON.parse(savedTopics)
}

export function saveTopics(topics) {
  localStorage.setItem(
    TOPICS_KEY,
    JSON.stringify(topics)
  )
}
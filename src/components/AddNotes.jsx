import { openDB } from '../db/indexedDB'

export async function addNote(noteText) {
  const db = await openDB()

  const transaction = db.transaction('notes', 'readwrite')
  const store = transaction.objectStore('notes')

  store.add({
    text: noteText,
    createdAt: new Date()
  })

  return transaction.complete
}
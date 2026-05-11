const DB_NAME = 'NotesDB'
const STORE_NAME = 'notes'
const DB_VERSION = 1

// Function to open IndexedDB database
export function openDB() {

  return new Promise((resolve, reject) => {

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    // Create object store when database is first created
    request.onupgradeneeded = (event) => {

      const db = event.target.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {

        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        })

      }
    }

    // Database opened successfully
    request.onsuccess = () => {
      resolve(request.result)
    }

    // Error opening database
    request.onerror = () => {
      reject(request.error)
    }

  })
}
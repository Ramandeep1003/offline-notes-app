import { useEffect, useState } from 'react'
import { addNote } from './components/AddNotes'
import { getAllNotes } from './components/GetNotes'
import './App.css'

function App() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  const loadNotes = async () => {
    const allNotes = await getAllNotes()
    setNotes(allNotes)
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const handleAddNote = async () => {
    if (!note.trim()) return

    await addNote(note)
    setNote('')
    loadNotes()
  }

  return (
    <div className="container">
      <h1>Offline Notes App</h1>

      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter note"
      />

      <button onClick={handleAddNote}>
        Add Note
      </button>

      <h2>Saved Notes</h2>

      <ul>
        {notes.map((item) => (
          <li key={item.id}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
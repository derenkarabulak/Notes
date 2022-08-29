import React, {useState, useEffect} from 'react'
import {nanoid} from 'nanoid'
import Header from './components/Header';
import Search from './components/Search';
import NotesList from './components/NotesList';

function App(){
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "First note",
      date:"22/08/2022"
    },
    {
      id: nanoid(),
      text:"Second note",
      date: "22/08/2022"
    },
    {
      id: nanoid(),
      text: "Third date",
      date: "24/08/2022"
    },
  ]);
  
  const [darkMode, setDarkMode] = useState(false);
  const [searchNote, setSearchNote] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if(savedNotes){
      setNotes(savedNotes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes])
  const addNote = (text) => {

  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString()
  }

  const newNotes = [...notes, newNote]
  setNotes(newNotes)
}

const deletingNote = (id) => {
  const newNotes = notes.filter((note) => note.id!==id);
  setNotes(newNotes);
}

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearch={setSearchNote}/>
        <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchNote))} handleAddNote = {addNote} handleDelete={deletingNote} />
      </div>
    </div>
  )
}

export default App;
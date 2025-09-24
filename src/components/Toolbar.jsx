import React from 'react'
import { useNotes } from '../context/NotesContext'

function Toolbar({ isSidebarOpen, setIsSidebarOpen }) {
  const { addNote, deleteNote, activeNoteId, filteredNotes } = useNotes()

  const handleNewNote = () => {
    addNote()
  }

  const handleDeleteNote = () => {
    if (activeNoteId) {
      deleteNote(activeNoteId)
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Notes List Button */}
        <button 
          className="md:hidden flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          onClick={toggleSidebar}
          title={`${isSidebarOpen ? 'Close' : 'Open'} notes list`}
        >
          <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Notes ({filteredNotes.length})
          </span>
        </button>
        
        <button 
          className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm md:text-base"
          onClick={handleNewNote}
          title="Create new note"
        >
          <span className="text-lg">+</span>
          <span className="hidden sm:inline">New Note</span>
        </button>
        
        <button 
          className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base ${
            activeNoteId 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleDeleteNote}
          disabled={!activeNoteId}
          title="Delete current note"
        >
          <span className="text-lg">🗑</span>
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      {/* App Title - Hidden on mobile */}
      <h1 className="hidden md:block text-lg font-semibold text-gray-900 dark:text-gray-100">
        Notes App
      </h1>

      {/* Spacer for mobile */}
      <div className="md:hidden"></div>
    </div>
  )
}

export default Toolbar
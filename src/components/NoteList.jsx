import React from 'react'
import { useNotes } from '../context/NotesContext'
import SearchBar from './SearchBar'
import NoteItem from './NoteItem'

function NoteList({ onClose }) {
  const { filteredNotes, searchQuery } = useNotes()

  const handleClose = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Close button clicked') // Debug log
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="w-80 sm:w-96 md:w-80 lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Mobile Header with Close Button */}
      <div className="md:hidden flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative z-10">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Notes</h2>
        <button
          onClick={handleClose}
          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors active:bg-gray-200 dark:active:bg-gray-600 relative z-20 min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="Close sidebar"
          type="button"
        >
          <svg className="w-6 h-6 text-gray-600 dark:text-gray-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <SearchBar />
      
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 md:p-8 text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📝</div>
            {searchQuery ? (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm md:text-base">
                  No notes found for "{searchQuery}"
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
                  Try a different search term
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm md:text-base">
                  No notes yet
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
                  Create your first note to get started
                </p>
              </>
            )}
          </div>
        ) : (
          <div>
            {filteredNotes.map(note => (
              <NoteItem key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteList
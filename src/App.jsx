import React, { useEffect, useState } from 'react'
import { NotesProvider, useNotes } from './context/NotesContext'
import Toolbar from './components/Toolbar'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import Settings from './components/Settings'

function AppContent() {
  const { theme, activeNoteId } = useNotes()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Apply theme class to HTML element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Auto-close sidebar on mobile when a note is selected
  useEffect(() => {
    if (activeNoteId && window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }, [activeNoteId])

  // Debug state changes
  useEffect(() => {
    console.log('Sidebar state changed:', isSidebarOpen)
  }, [isSidebarOpen])

  const closeSidebar = () => {
    console.log('Closing sidebar, current state:', isSidebarOpen) // Debug log
    setIsSidebarOpen(false)
    console.log('Set sidebar state to false') // Debug log
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Toolbar - Always visible */}
      <Toolbar 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={closeSidebar}
          />
        )}
        
        {/* Sidebar with Note List */}
        {/* Desktop: Always show, Mobile: Show only when open */}
        <div className="hidden md:block md:relative">
          <NoteList onClose={closeSidebar} />
        </div>

        {/* Mobile Sidebar - Separate element for better control */}
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 h-full z-30 md:hidden animate-slideIn">
            <NoteList onClose={closeSidebar} />
          </div>
        )}
        
        {/* Main Editor Area */}
        <div className="flex-1 min-w-0">
          <NoteEditor />
        </div>
      </div>
      
      {/* Settings Modal */}
      <Settings />
    </div>
  )
}

function App() {
  return (
    <NotesProvider>
      <AppContent />
    </NotesProvider>
  )
}

export default App
import React from 'react'
import { useNotes } from '../context/NotesContext'

function NoteItem({ note }) {
  const { activeNoteId, setActiveNoteId } = useNotes()
  
  const isActive = note.id === activeNoteId
  
  const handleClick = () => {
    setActiveNoteId(note.id)
  }

  // Extract title from content (first line or first heading)
  const getTitle = (content) => {
    const lines = content.split('\n')
    const firstLine = lines[0]?.trim()
    
    // If first line is a heading, remove the # symbols
    if (firstLine?.startsWith('#')) {
      return firstLine.replace(/^#+\s*/, '')
    }
    
    // Otherwise use first non-empty line
    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        return trimmed.length > 50 ? trimmed.substring(0, 50) + '...' : trimmed
      }
    }
    
    return 'Untitled Note'
  }

  // Get preview text (first few lines excluding title)
  const getPreview = (content) => {
    const lines = content.split('\n')
    let previewLines = []
    let startIndex = 0
    
    // Skip the title line if it's a heading
    if (lines[0]?.trim().startsWith('#')) {
      startIndex = 1
    }
    
    // Get next few non-empty lines
    for (let i = startIndex; i < lines.length && previewLines.length < 2; i++) {
      const line = lines[i]?.trim()
      if (line && !line.startsWith('#')) {
        previewLines.push(line)
      }
    }
    
    const preview = previewLines.join(' ')
    return preview.length > 80 ? preview.substring(0, 80) + '...' : preview
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) {
      return 'Today'
    } else if (diffDays === 2) {
      return 'Yesterday'
    } else if (diffDays <= 7) {
      return `${diffDays - 1}d ago`
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  return (
    <div 
      className={`p-3 md:p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
        isActive ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-500' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1 md:mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 mr-2 text-sm md:text-base">
          {getTitle(note.content)}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          {formatDate(note.updatedAt)}
        </span>
      </div>
      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
        {getPreview(note.content)}
      </p>
    </div>
  )
}

export default NoteItem
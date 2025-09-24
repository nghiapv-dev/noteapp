import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNotes } from '../context/NotesContext'

function NoteEditor() {
  const { activeNote, updateNote } = useNotes()
  const [content, setContent] = useState('')
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content)
    }
  }, [activeNote])

  const handleContentChange = (e) => {
    const newContent = e.target.value
    setContent(newContent)
    
    if (activeNote) {
      // Auto-save with debouncing
      updateNote(activeNote.id, { content: newContent })
    }
  }

  if (!activeNote) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="text-center max-w-md">
          <div className="text-4xl md:text-6xl mb-3 md:mb-4">📝</div>
          <h2 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select a note or create a new one
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
            Choose a note from the sidebar to start editing
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Mobile Toggle Buttons */}
      <div className="md:hidden flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={() => setIsPreviewMode(false)}
          className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${
            !isPreviewMode 
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setIsPreviewMode(true)}
          className={`flex-1 py-3 px-4 font-medium text-sm transition-colors ${
            isPreviewMode 
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Preview
        </button>
      </div>

      {/* Desktop Split View / Mobile Single View */}
      <div className="flex-1 flex">
        {/* Editor Panel */}
        <div className={`flex-1 flex flex-col border-r border-gray-200 dark:border-gray-700 ${
          isPreviewMode ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base">Editor</h3>
          </div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing your note in Markdown..."
            className="flex-1 p-3 md:p-4 resize-none border-none outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-xs md:text-sm leading-relaxed"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
          />
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 flex flex-col ${
          !isPreviewMode ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="hidden md:block bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 text-sm md:text-base">Preview</h3>
          </div>
          <div className="flex-1 p-3 md:p-4 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="prose prose-sm md:prose prose-gray dark:prose-invert max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteEditor
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const NotesContext = createContext()

// Initial state
const initialState = {
  notes: [],
  activeNoteId: null,
  searchQuery: '',
  theme: 'light',
  font: {
    family: 'Inter, system-ui, sans-serif',
    size: 16
  }
}

// Action types
const ACTIONS = {
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  SET_ACTIVE_NOTE: 'SET_ACTIVE_NOTE',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_THEME: 'SET_THEME',
  SET_FONT: 'SET_FONT'
}

// Reducer function
function notesReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_NOTES:
      return { ...state, notes: action.payload }
    
    case ACTIONS.ADD_NOTE:
      const newNote = {
        id: uuidv4(),
        title: 'New Note',
        content: '# New Note\n\nStart writing your note here...',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      return {
        ...state,
        notes: [newNote, ...state.notes],
        activeNoteId: newNote.id
      }
    
    case ACTIONS.UPDATE_NOTE:
      const updatedNotes = state.notes.map(note =>
        note.id === action.payload.id
          ? {
              ...note,
              ...action.payload.updates,
              updatedAt: new Date().toISOString()
            }
          : note
      )
      return { ...state, notes: updatedNotes }
    
    case ACTIONS.DELETE_NOTE:
      const filteredNotes = state.notes.filter(note => note.id !== action.payload)
      const newActiveId = state.activeNoteId === action.payload
        ? (filteredNotes.length > 0 ? filteredNotes[0].id : null)
        : state.activeNoteId
      return {
        ...state,
        notes: filteredNotes,
        activeNoteId: newActiveId
      }
    
    case ACTIONS.SET_ACTIVE_NOTE:
      return { ...state, activeNoteId: action.payload }
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload }
    
    case ACTIONS.SET_FONT:
      return { ...state, font: { ...state.font, ...action.payload } }
    
    default:
      return state
  }
}

export function NotesProvider({ children }) {
  const [storedNotes, setStoredNotes] = useLocalStorage('notes', [])
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', 'light')
  const [storedFont, setStoredFont] = useLocalStorage('font', initialState.font)
  
  const [state, dispatch] = useReducer(notesReducer, {
    ...initialState,
    notes: storedNotes,
    theme: storedTheme,
    font: storedFont
  })

  // Sync with localStorage when state changes
  useEffect(() => {
    setStoredNotes(state.notes)
  }, [state.notes, setStoredNotes])

  useEffect(() => {
    setStoredTheme(state.theme)
  }, [state.theme, setStoredTheme])

  useEffect(() => {
    setStoredFont(state.font)
  }, [state.font, setStoredFont])

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  // Apply font settings to document root
  useEffect(() => {
    document.documentElement.style.fontFamily = state.font.family
    document.documentElement.style.fontSize = `${state.font.size}px`
  }, [state.font])

  // Action creators
  const addNote = () => {
    dispatch({ type: ACTIONS.ADD_NOTE })
  }

  const updateNote = (id, updates) => {
    dispatch({ type: ACTIONS.UPDATE_NOTE, payload: { id, updates } })
  }

  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch({ type: ACTIONS.DELETE_NOTE, payload: id })
    }
  }

  const setActiveNoteId = (id) => {
    dispatch({ type: ACTIONS.SET_ACTIVE_NOTE, payload: id })
  }

  const setSearchQuery = (query) => {
    dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query })
  }

  const setTheme = (theme) => {
    dispatch({ type: ACTIONS.SET_THEME, payload: theme })
  }

  const setFont = (fontUpdates) => {
    dispatch({ type: ACTIONS.SET_FONT, payload: fontUpdates })
  }

  // Computed values
  const activeNote = state.notes.find(note => note.id === state.activeNoteId)
  
  const filteredNotes = state.notes.filter(note => {
    if (!state.searchQuery) return true
    const query = state.searchQuery.toLowerCase()
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    )
  })

  const contextValue = {
    // State
    notes: state.notes,
    filteredNotes,
    activeNote,
    activeNoteId: state.activeNoteId,
    searchQuery: state.searchQuery,
    theme: state.theme,
    font: state.font,
    
    // Actions
    addNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
    setSearchQuery,
    setTheme,
    setFont
  }

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}

export default NotesContext
import React, { useState } from 'react'
import { useNotes } from '../context/NotesContext'

function Settings() {
  const { theme, setTheme, font, setFont } = useNotes()
  const [isOpen, setIsOpen] = useState(false)

  const fontFamilies = [
    { value: 'Inter, system-ui, sans-serif', label: 'Inter' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: '"Times New Roman", serif', label: 'Times New Roman' },
    { value: '"Courier New", monospace', label: 'Courier New' },
    { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  ]

  const fontSizes = [12, 14, 16, 18, 20, 22, 24]

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleFontFamilyChange = (e) => {
    setFont({ family: e.target.value })
  }

  const handleFontSizeChange = (e) => {
    setFont({ size: parseInt(e.target.value) })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 md:top-4 right-3 md:right-4 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-shadow z-50"
        title="Settings"
      >
        <span className="text-lg">⚙️</span>
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Settings
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* Theme Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 md:mb-3">
              Theme
            </label>
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg border transition-colors text-sm md:text-base ${
                  theme === 'light'
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>☀️</span>
                Light
              </button>
              <button
                onClick={toggleTheme}
                className={`flex items-center justify-center gap-2 px-3 md:px-4 py-2 rounded-lg border transition-colors text-sm md:text-base ${
                  theme === 'dark'
                    ? 'bg-blue-900 border-blue-600 text-blue-200'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span>🌙</span>
                Dark
              </button>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Family
            </label>
            <select
              value={font.family}
              onChange={handleFontFamilyChange}
              className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontFamilies.map((fontFamily) => (
                <option key={fontFamily.value} value={fontFamily.value}>
                  {fontFamily.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Font Size
            </label>
            <select
              value={font.size}
              onChange={handleFontSizeChange}
              className="w-full p-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview
            </label>
            <div 
              className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
              style={{ fontFamily: font.family, fontSize: `${font.size}px` }}
            >
              <p className="text-gray-900 dark:text-gray-100">
                The quick brown fox jumps over the lazy dog.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm md:text-base"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
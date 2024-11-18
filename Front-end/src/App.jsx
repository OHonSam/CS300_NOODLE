import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="flex space-x-8">
            <a href="https://vite.dev" target="_blank" className="hover:scale-110 transition-transform">
                <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" className="hover:scale-110 transition-transform">
                <img src={reactLogo} className="w-24 h-24" alt="React logo" />
            </a>
            </div>
            <h1 className="text-4xl font-bold text-blue-600 mt-6">Vite + React + Tailwind</h1>
            <div className="card bg-white shadow-lg p-6 mt-6 rounded-lg">
            <button
                onClick={() => setCount((count) => count + 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            >
                Count is {count}
            </button>
            <p className="text-gray-600 mt-4">
                Edit <code className="bg-gray-200 px-1 py-0.5 rounded">src/App.jsx</code> and save to test HMR.
            </p>
            </div>
            <p className="read-the-docs text-gray-500 mt-8">
            Click on the Vite and React logos to learn more.
            </p>
        </div>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/')  // Make sure the URL matches exactly
      .then(response => {
        console.log('Raw response:', response); // Debug log
        return response.json();
      })
      .then(data => {
        console.log('Received data:', data); // Debug log
        setCourses(data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

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
        {/* Display message from backend */}
        {/* <p className="text-2xl text-green-600 mt-4">{message}</p> */}
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

        {/* Course List Section */}
        <div className="w-full max-w-4xl mt-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses && courses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600">{course.name}</h3>
                <p className="text-gray-600">{course.description}</p>
                <p className="text-sm text-gray-500 mt-2">{course.message}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="read-the-docs text-gray-500 mt-8">
          Click on the Vite and React logos to learn more.
        </p>
      </div>
    </>
  )
}

export default App
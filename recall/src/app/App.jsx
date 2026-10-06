import { Routes, Route, Link } from 'react-router-dom'

function Home() {
  return <h1 className="text-3xl font-bold">Hi Kendrick.</h1>
}

function Library() {
  return <h1 className="text-3xl font-bold">Your Library</h1>
}

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 p-10 text-white">
      <nav className="mb-10 flex gap-6">
        <Link to="/" className="hover:text-indigo-400">
          Home
        </Link>

        <Link to="/library" className="hover:text-indigo-400">
          Library
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </div>
  )
}

export default App
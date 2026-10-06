import { Routes, Route, Link } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout.jsx'
import Home from '../pages/Home.jsx'
import Library from '../pages/Library.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/inbox" element={<h1>Inbox</h1>} />
        <Route path="/trash" element={<h1>Trash</h1>} />
      </Route>
    </Routes>
  )
}

export default App
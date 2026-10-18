
import { Routes, Route } from 'react-router-dom'

import AppLayout from '../components/layout/AppLayout.jsx'

import Home from '../pages/Home.jsx'
import Library from '../pages/Library.jsx'
import Subject from '../pages/Subject.jsx'
import Topic from '../pages/Topic.jsx'
import Note from '../pages/Note.jsx'
import Trash from '../pages/Trash.jsx'
import Search from '../pages/Search.jsx'
import Inbox from '../pages/Inbox.jsx'
import Backup from '../pages/Backup.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/library" element={<Library />} />
        <Route path="/library/:subjectId" element={<Subject />} />
        <Route path="/library/:subjectId/:topicId" element={<Topic />} />
        <Route
          path="/library/:subjectId/:topicId/:noteId"
          element={<Note />}
        />

        <Route path="/inbox" element={<Inbox />} />
        <Route path="/inbox/:noteId" element={<Note />} />

        <Route path="/trash" element={<Trash />} />
        <Route path="/search" element={<Search />} />

        {/* Backup & Restore */}
        <Route path="/backup" element={<Backup />} />
      </Route>
    </Routes>
  )
}

export default App

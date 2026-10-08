import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Subject() {
  const { subjectId } = useParams()

  return (
    <div className="mx-auto max-w-5xl space-y-6">

      <Link
        to="/library"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Library
      </Link>

      <h1 className="text-3xl font-bold">
        Subject Page
      </h1>

      <p className="text-zinc-400">
        Subject ID: {subjectId}
      </p>

    </div>
  )
}

export default Subject
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Plus,
  LibraryBig,
  Clock3,
  ArrowRight
} from 'lucide-react'

function Home() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">

      {/* Welcome Section */}
      <section>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-indigo-400">
          Your Workspace
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white">
          Hi Kendrick<span className="text-indigo-400">.</span>
        </h1>

        <p className="mt-3 text-zinc-400">
          A quiet place to keep what you learn.
        </p>
      </section>

      {/* Empty State */}
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
          <BookOpen className="text-indigo-400" size={28} />
        </div>

        <h2 className="text-xl font-semibold text-white">
          Your knowledge starts here.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
          Create your first subject and start organizing
          everything you learn, one concept at a time.
        </p>

        <Link
          to="/library"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
        >
          <Plus size={18} />
          Create your first subject
        </Link>

      </section>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Link
          to="/library"
          className="group rounded-xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-700"
        >
          <div className="mb-5 flex items-center justify-between">
            <LibraryBig className="text-indigo-400" size={23} />
            <ArrowRight
              className="text-zinc-500 transition-transform group-hover:translate-x-1"
              size={18}
            />
          </div>

          <h3 className="font-semibold text-white">
            My Subjects
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Your learning library will appear here.
          </p>
        </Link>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="mb-5">
            <Clock3 className="text-indigo-400" size={23} />
          </div>

          <h3 className="font-semibold text-white">
            Recent Notes
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            Your recently opened notes will appear here.
          </p>
        </div>

      </section>

    </div>
  )
}

export default Home
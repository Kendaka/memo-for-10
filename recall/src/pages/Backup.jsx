
import { useState } from 'react'
import { Download, Upload, ShieldCheck } from 'lucide-react'

import {
  exportBackup,
  importBackup,
} from './storage/backupStorage'

function Backup() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleImport(event) {
    const file = event.target.files?.[0]

    if (!file) return

    setLoading(true)
    setMessage('')

    try {
      const imported = await importBackup(file)

      if (imported) {
        window.alert('Backup imported successfully!')
        window.location.reload()
      }
    } catch (error) {
      setMessage(
        error.message || 'Unable to import backup.'
      )
    } finally {
      setLoading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Backup & Restore.
        </h1>

        <p className="mt-2 text-zinc-400">
          Keep your knowledge safe outside this browser.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <Download size={26} className="text-indigo-400" />

          <h2 className="text-xl font-semibold text-white">
            Export Backup
          </h2>

          <p className="text-sm leading-6 text-zinc-400">
            Download your subjects, topics, notes,
            and blocks as a JSON file.
          </p>

          <button
            type="button"
            onClick={exportBackup}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
          >
            Download Backup
          </button>
        </div>

        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <Upload size={26} className="text-indigo-400" />

          <h2 className="text-xl font-semibold text-white">
            Import Backup
          </h2>

          <p className="text-sm leading-6 text-zinc-400">
            Restore a previous Recall backup.
            This replaces your current data.
          </p>

          <label className="inline-flex cursor-pointer items-center rounded-lg border border-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-800">
            {loading ? 'Importing...' : 'Choose Backup File'}

            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              disabled={loading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
        <ShieldCheck
          size={22}
          className="shrink-0 text-indigo-400"
        />

        <p className="text-sm leading-6 text-zinc-400">
          Recall currently stores data in your browser.
          Keep regular backups somewhere safe.
          Importing replaces all existing data.
        </p>
      </div>

      {message && (
        <p className="text-sm text-red-400">
          {message}
        </p>
      )}
    </div>
  )
}

export default Backup

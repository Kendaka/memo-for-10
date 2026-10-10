import { Trash2 } from 'lucide-react'

const blockLabels = {
  purpose: 'Purpose',
  keyIdea: 'Key Idea',
  explanation: 'Explanation',
  code: 'Code',
  example: 'Example',
  math: 'Math',
  question: 'Question',
  text: 'Text',
}

function NoteBlock({ block, onChange, onDelete }) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-zinc-900 p-5">

      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          {blockLabels[block.type]}
        </span>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete block"
          className="text-zinc-500 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <textarea
        value={block.content}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Write your ${blockLabels[block.type].toLowerCase()}...`}
        rows={block.type === 'code' ? 6 : 3}
        className={`w-full resize-y bg-transparent text-zinc-200 outline-none ${
          block.type === 'code'
            ? 'font-mono text-sm'
            : 'leading-7'
        }`}
      />

    </div>
  )
}

export default NoteBlock
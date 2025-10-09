import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Bienvenue</h2>
      <p>Ouvrir l’éditeur de CV pour prévisualiser et réorganiser les sections.</p>
      <div className="flex gap-3">
        <Link href="/editor" className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500">Ouvrir l’éditeur</Link>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            CVtor
          </h1>
          <p className="text-2xl text-white/90 mb-4">
            Créez un CV professionnel en quelques minutes
          </p>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Éditeur de CV moderne avec IA intégrée, templates personnalisables,
            et export PDF/DOCX professionnel.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">IA Intégrée</h3>
            <p className="text-white/80">
              Générez automatiquement du contenu professionnel avec l'intelligence artificielle GPT-5
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-white mb-3">Templates Modernes</h3>
            <p className="text-white/80">
              Choisissez parmi plusieurs designs professionnels et personnalisez-les à votre goût
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Édition Rapide</h3>
            <p className="text-white/80">
              Drag & drop, édition en temps réel, et prévisualisation instantanée
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/editor" 
            className="inline-block px-10 py-4 bg-white text-indigo-600 rounded-full text-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-2xl"
          >
            Commencer maintenant →
          </Link>
        </div>

        <div className="mt-20 max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Fonctionnalités</h2>
          <div className="grid md:grid-cols-2 gap-6 text-white/90">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Drag & Drop</strong> - Réorganisez les sections facilement
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Édition Inline</strong> - Modifiez directement vos informations
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Export PDF/DOCX</strong> - Formats professionnels
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Génération IA</strong> - Contenu optimisé automatiquement
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Prévisualisation Live</strong> - Voyez les changements en temps réel
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong>Styles Personnalisés</strong> - Couleurs, polices, alignement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

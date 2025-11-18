# Dashboard Admin CVtor - Documentation

## 🎉 Félicitations !

Votre dashboard admin pour CVtor a été créé avec succès ! Vous pouvez maintenant gérer vos templates et catégories de CV depuis une interface d'administration dédiée.

## ✅ Ce qui a été créé

### Backend (API)

1. **Modèles de base de données** (`backend/models/models.py`)
   - Table `categories` : Pour organiser les templates par catégorie
   - Table `templates` : Pour stocker vos templates de CV
   - Champ `is_admin` ajouté au modèle `User` pour restreindre l'accès admin

2. **Routes API Admin** (`backend/services/routes_admin.py`)
   - `GET /api/admin/templates` - Liste tous les templates (requiert authentification admin)
   - `POST /api/admin/templates` - Créer un nouveau template
   - `PUT /api/admin/templates/{id}` - Modifier un template
   - `DELETE /api/admin/templates/{id}` - Supprimer un template
   - `GET /api/admin/categories` - Liste toutes les catégories
   - `POST /api/admin/categories` - Créer une catégorie
   - `PUT /api/admin/categories/{id}` - Modifier une catégorie
   - `DELETE /api/admin/categories/{id}` - Supprimer une catégorie

3. **Routes API Publiques** (`backend/services/routes_templates_public.py`)
   - `GET /api/templates` - Liste les templates actifs (sans authentification)
   - `GET /api/categories` - Liste les catégories (sans authentification)

4. **Gestion des fichiers**
   - Upload de miniatures pour les templates
   - Stockage dans le dossier `backend/uploads/`

### Frontend (Interface utilisateur)

1. **Page de gestion des templates** (`frontend/app/admin/templates/page.tsx`)
   - Interface pour créer, modifier et supprimer des templates
   - Upload de miniatures
   - Configuration des prix
   - Attribution de catégories
   - Gestion du statut actif/inactif

2. **Page de gestion des catégories** (`frontend/app/admin/categories/page.tsx`)
   - Interface pour créer, modifier et supprimer des catégories
   - Organisation simple avec nom, slug et description

3. **Page publique des modèles** (`frontend/app/modeles/page.tsx`)
   - Affichage dynamique des templates depuis la base de données
   - Filtrage par catégorie
   - Affichage des miniatures et prix

## 🚀 Comment utiliser

### 1. Accès administrateur

Un compte administrateur a été créé avec les identifiants suivants :
- **Email** : `admin@cvtor.com`
- **Mot de passe** : `admin123`

**⚠️ IMPORTANT** : Changez ce mot de passe après votre première connexion !

### 2. Accéder au dashboard admin

1. Connectez-vous avec les identifiants admin
2. Accédez à `/admin/templates` pour gérer les templates
3. Accédez à `/admin/categories` pour gérer les catégories

### 3. Créer une catégorie

1. Allez sur `/admin/categories`
2. Cliquez sur "Ajouter une Catégorie"
3. Remplissez les champs :
   - **Nom** : ex. "Professionnel"
   - **Slug** : ex. "professionnel" (utilisé dans l'URL)
   - **Description** : ex. "Templates professionnels pour cadres"
4. Cliquez sur "Créer"

### 4. Créer un template

1. Allez sur `/admin/templates`
2. Cliquez sur "Ajouter un Template"
3. Remplissez les champs :
   - **Titre** : Nom du template
   - **Slug** : Identifiant unique (ex: "classique-pro")
   - **Description** : Description du template
   - **Prix** : Prix en euros (0 pour gratuit)
   - **Catégorie** : Sélectionnez une catégorie
   - **Miniature** : Uploadez une image d'aperçu
   - **Template Data** : JSON optionnel pour stocker la configuration
   - **Actif** : Cochez pour rendre le template visible publiquement
4. Cliquez sur "Créer"

### 5. Données initiales

La base de données a été remplie avec des données d'exemple :
- 4 catégories : Professionnel, Créatif, Minimaliste, Traditionnel
- 4 templates : Classique, Moderne, Professional, Tokyo

## 🔧 Configuration requise

### Variables d'environnement

Les variables suivantes sont déjà configurées, mais assurez-vous qu'elles sont correctes :

**Frontend** (`.env.local`) :
```
NEXT_PUBLIC_API_URL=https://votre-domaine.replit.dev:8000
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_supabase
```

**Backend** :
```
DATABASE_URL=votre_url_postgresql
```

## ⚠️ Problèmes connus et solutions

### 1. Erreur CORS
Si vous voyez des erreurs CORS dans la console :
- Vérifiez que `NEXT_PUBLIC_API_URL` pointe vers le bon domaine avec le port 8000
- Le backend accepte déjà les requêtes du frontend Replit

### 2. Secrets Supabase inversés
Si vous voyez l'erreur "NEXT_PUBLIC_SUPABASE_URL semble contenir une clé au lieu d'une URL" :
- Vérifiez vos secrets Replit
- `NEXT_PUBLIC_SUPABASE_URL` doit commencer par `https://...supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` doit commencer par `eyJ...`

### 3. Templates ne s'affichent pas sur /modeles
- Vérifiez que les templates sont marqués comme "Actif" dans l'admin
- Vérifiez que `NEXT_PUBLIC_API_URL` est correctement configuré
- Regardez la console du navigateur pour les erreurs réseau

## 📝 Prochaines étapes suggérées

1. **Sécurité** :
   - Changer le mot de passe admin
   - Ajouter un système de rôles plus sophistiqué
   - Implémenter une limitation du nombre de requêtes

2. **Fonctionnalités** :
   - Ajouter un éditeur WYSIWYG pour les templates
   - Implémenter une prévisualisation des templates
   - Ajouter des statistiques (templates les plus utilisés)
   - Permettre l'upload de fichiers template complets (HTML/CSS)

3. **UX** :
   - Ajouter une recherche dans les templates
   - Pagination pour les grandes listes
   - Drag & drop pour réorganiser les templates

## 🐛 Debugging

### Logs backend
```bash
# Voir les logs du backend
tail -f /tmp/logs/Backend_API_*.log
```

### Logs frontend
```bash
# Voir les logs du frontend
tail -f /tmp/logs/Frontend_App_*.log
```

### Tester l'API
```bash
# Tester l'endpoint public des templates
curl https://votre-domaine.replit.dev:8000/api/templates

# Tester l'endpoint des catégories
curl https://votre-domaine.replit.dev:8000/api/categories
```

## 📚 Structure des fichiers

```
backend/
├── models/models.py              # Modèles de base de données
├── services/
│   ├── routes_admin.py          # Routes admin (protégées)
│   └── routes_templates_public.py # Routes publiques
├── uploads/                      # Fichiers uploadés (miniatures)
├── create_tables.py             # Script de création des tables
└── seed_data.py                 # Script de données initiales

frontend/
├── app/
│   ├── admin/
│   │   ├── templates/page.tsx   # Gestion des templates
│   │   └── categories/page.tsx  # Gestion des catégories
│   └── modeles/page.tsx         # Page publique des templates
└── .env.local                   # Variables d'environnement
```

## ✨ Bon travail !

Votre dashboard admin est maintenant prêt à l'emploi. N'hésitez pas à le personnaliser selon vos besoins !

---

**Besoin d'aide ?** Consultez la documentation de l'API à `/docs` (Swagger UI) quand le backend tourne.

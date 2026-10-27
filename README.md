# Sébastien Botty — Portfolio

Portfolio Next.js 16 (App Router), React 19 et TypeScript. La direction visuelle de `docs/refonte` est intégrée à l’application : typographie animée, pile de projets en perspective, galerie, aperçus modaux et pages projets complètes.

## Développement

Node.js 20.9 minimum.

```sh
npm install
npm run dev
```

Ouvrir http://localhost:3000. La racine redirige vers `/fr`; la version anglaise est disponible sur `/en`. Dans PowerShell, utiliser `npm.cmd` si la politique d’exécution bloque `npm.ps1`.

## Production et vérifications

```sh
npm run build
npm test
npm start
```

Les tests démarrent un serveur de production temporaire et vérifient le HTML pré-rendu, les métadonnées FR/EN, les six projets, les redirections, les 404, le sitemap, les robots et la génération des images.

Le déploiement doit utiliser un hébergement compatible Next.js avec Node.js, par exemple Vercel, ou exécuter `npm run build` puis `npm start`. Le dossier `build/` de l’ancienne version CRA n’est plus la sortie de production. Les images optimisées, les cartes de partage et les redirections nécessitent le serveur Next.js.

## Configuration

- `NEXT_PUBLIC_FORM_ENDPOINT` : identifiant du formulaire Formspree. L’ancien `REACT_APP_FORM_ENDPOINT` reste accepté pour conserver le `.env` existant. Ne mettre ici que l’identifiant public du formulaire, jamais une clé privée.
- Sans identifiant Formspree, le contact par e-mail reste disponible.
- Domaine canonique : `SITE_URL` dans `src/portfolio/seo.ts`, actuellement `https://sebastienbotty.com`.

## SEO et contenu

Les pages `/fr`, `/en` et `/[lang]/projects/[slug]` sont pré-rendues. Chaque page possède un titre, une description, une URL canonique, des alternatives `hreflang`, des cartes Open Graph/Twitter et des données structurées. `/sitemap.xml` inclut les 14 URL canoniques. `/robots.txt` permet aux moteurs de suivre les anciennes URL et leurs redirections permanentes.

Les anciennes adresses `/project/Tou`, `/project/Not-messenger`, `/project/CheckCar`, `/project/Undercover` et `/project/Freelance%20Prospecting%20Dashboard` redirigent vers leurs nouvelles pages. L’ancien lien Portfolio revient à la sélection de projets.

- Présentation et traductions : `src/portfolio/`.
- Descriptions détaillées réutilisées : `src/translations/projectsContainer.ts`.
- Mission institutionnelle : `src/Constants/experiences.ts`.
- Routes et styles actifs : `src/app/`.

Les anciens composants CRA restent comme référence hors du graphe de compilation. `src/Pages` est renommé `src/legacy-pages` pour que Next.js ne le confonde pas avec son Pages Router sous Windows. Un retour à la version CRA se fait en restaurant le commit précédent et son verrou npm, puis en relançant `npm ci`.

L’envoi réel du formulaire doit être vérifié avec le compte Formspree du propriétaire; les tests n’envoient aucun message.

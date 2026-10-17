# Vieux Tracteurs · catalogue de référence

Site statique (HTML, CSS, JavaScript, sans framework ni étape de compilation) qui présente les tracteurs anciens photographiés à Tractomania, à Caussade, en 2026. Il fonctionne en ouvrant `index.html` directement depuis le disque, et tel quel sur GitHub Pages.

## Organisation

| Chemin | Rôle |
|---|---|
| `index.html` | Catalogue : grille de cartes et filtres (recherche, marque, période, pays, puissance), reflétés dans l'URL |
| `tracteur.html?id=…` | Fiche d'un tracteur : photos, histoire, caractéristiques, constructeur, commentaires |
| `constructeurs.html` | Une section par constructeur, avec ses modèles du catalogue |
| `forum.html` | Forum général (Giscus) |
| `proposer.html` | Formulaire qui ouvre une issue GitHub préremplie (label `proposition`) |
| `boutique.html` | Page d'attente de la boutique |
| `data/tracteurs.js` | Données des tracteurs (`window.TRACTEURS`) |
| `data/constructeurs.js` | Données des constructeurs (`window.CONSTRUCTEURS`) |
| `assets/js/config.js` | Nom du dépôt et réglages Giscus |
| `assets/img/tracteurs/` | Photos allégées (1600 px) ; `vignettes/` : 600 px |
| `identification/photos.csv` | Identification photo par photo (marque, modèle, indices, confiance, groupe) |

Les données sont dans des fichiers `.js` et non `.json` : un navigateur refuse de lire un fichier JSON local quand on ouvre la page depuis le disque.

Les photos originales (`photos-tractomania-caussade-2026/`) ne sont pas publiées : elles sont exclues par `.gitignore`.

## Ajouter un tracteur

1. Réduire les photos : 1600 px de large dans `assets/img/tracteurs/`, 600 px dans `assets/img/tracteurs/vignettes/`, même nom de fichier en minuscules.
2. Si le constructeur n'existe pas, l'ajouter dans `data/constructeurs.js` :
   `{ id, marque, nom, pays, fondation, fin, histoire }`.
3. Ajouter le tracteur dans `data/tracteurs.js` :

```js
{
  id: "fendt-farmer-2",          // unique, en minuscules, sans espace
  modele: "Farmer 2",
  surnom: "",
  constructeur: "fendt",         // id du constructeur
  pays: "Allemagne",
  debut: null, fin: null,         // années (nombres)
  puissance_ch: null, moteur: "", cylindres: null,
  cylindree_cm3: null, couple_nm: null, poids_kg: null,
  qualites: [], defauts: [],
  reputation: "", histoire: "",
  photos: ["assets/img/tracteurs/dsc09891.jpg"],
  sources: ["https://…"],       // URL des sources, affichées en bas de la fiche
  verifie: false
}
```

Laisser une valeur vide (`""`, `null` ou `[]`) plutôt que de deviner : la fiche affiche « à compléter ». Le champ `verifie` sert de suivi interne (il n'est plus affiché sur le site) : ne le passer à `true` qu'une fois les chiffres recoupés avec au moins une source fiable.

Après une modification des fichiers CSS ou JS, augmenter le numéro `?v=` dans les balises `<script>` et `<link>` des pages HTML pour que les navigateurs rechargent les nouvelles versions.

## Mise en ligne sur GitHub Pages

1. Pousser le dossier sur le dépôt `laurnalhac/vieux-tracteurs`.
2. Sur GitHub : *Settings › Pages › Build and deployment*, source « Deploy from a branch », branche `main`, dossier `/ (root)`.
3. Le site est publié à l'adresse `https://laurnalhac.github.io/vieux-tracteurs/` après une ou deux minutes.

## Commentaires (Giscus)

Les commentaires des fiches et le forum utilisent Giscus, qui stocke les messages dans les Discussions GitHub du dépôt. Il faut un compte GitHub pour écrire.

Réglages actuels (`assets/js/config.js`) :

- Discussions activées sur le dépôt ;
- catégorie **Announcements** pour les commentaires des fiches (un fil par tracteur, terme `tracteur-<id>`) : seuls Giscus et le propriétaire y créent des fils ;
- catégorie **General** pour le forum (terme fixe `forum-general`) ;
- l'application Giscus doit être installée sur le dépôt : https://github.com/apps/giscus

Pour changer de catégorie, relever ses identifiants sur https://giscus.app et les reporter dans `assets/js/config.js`. Si les identifiants sont vides, les pages affichent « Les commentaires seront activés à la mise en ligne du site. »

## Propositions

Le formulaire « Proposer un tracteur » ouvre une issue avec le label `proposition`. Créer ce label une fois dans *Issues › Labels* pour qu'il soit appliqué automatiquement.

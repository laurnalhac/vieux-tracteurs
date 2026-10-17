# Vieux Tracteurs · catalogue de référence

Site 100 % statique (HTML, CSS, JavaScript, sans framework, sans étape de compilation, sans commentaires ni forum) qui présente les tracteurs anciens photographiés à Tractomania, à Caussade, en 2026. Il fonctionne en ouvrant `index.html` directement depuis le disque, et tel quel sur GitHub Pages.

## Organisation

| Chemin | Rôle |
|---|---|
| `index.html` | Catalogue : grille de cartes et filtres (recherche, marque, période, pays, puissance), reflétés dans l'URL |
| `tracteur.html?id=…` | Fiche d'un tracteur : photos, histoire, caractéristiques, constructeur, sources |
| `constructeurs.html` | Une section par constructeur, avec ses modèles du catalogue |
| `technique-moteur.html` | Technique : moteur diesel, semi-diesel, refroidissement, embrayage, boîte, prise de force |
| `technique-relevage.html` | Technique : relevage hydraulique trois points et contrôle d'effort (Harry Ferguson) |
| `proposer.html` | Formulaire qui ouvre une issue GitHub préremplie (label `proposition`) |
| `data/tracteurs.js` | Données des tracteurs (`window.TRACTEURS`) |
| `data/constructeurs.js` | Données des constructeurs (`window.CONSTRUCTEURS`) |
| `assets/js/config.js` | Nom du dépôt GitHub (utilisé par le formulaire de proposition) |
| `assets/img/tracteurs/` | Photos allégées (1600 px) ; `vignettes/` : 600 px |
| `identification/photos.csv` | Identification photo par photo (marque, modèle, indices, confiance, groupe) |

Les données sont dans des fichiers `.js` et non `.json` : un navigateur refuse de lire un fichier JSON local quand on ouvre la page depuis le disque.

Les photos originales (`photos-tractomania-caussade-2026/`) ne sont pas publiées : elles sont exclues par `.gitignore`.

## Ajouter un tracteur

Photos : uniquement les photos de Laurent ou des photos sous licence libre de Wikimedia Commons (CC BY, CC BY-SA, CC0, domaine public), avec auteur et licence renseignés dans `credits`.

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
  anecdote: "",
  // Champs détaillés facultatifs (affichés seulement s'ils sont remplis) : usine, serie,
  // nombre_produit, alesage_course, regime, refroidissement, vitesses, vitesse_min_kmh,
  // vitesse_max_kmh, prise_de_force, relevage, dimensions, pneus, reservoir_l, versions,
  // prix_epoque, cote_collection.
  // credits: { "assets/img/tracteurs/x.jpg": { auteur, licence, page } } pour les photos libres.                 // encadré « Le saviez-vous ? » (paragraphes séparés par une ligne vide)
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

## Propositions

Le formulaire « Proposer un tracteur » ouvre une issue avec le label `proposition`. Créer ce label une fois dans *Issues › Labels* pour qu'il soit appliqué automatiquement.

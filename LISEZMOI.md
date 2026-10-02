# Flashmap — installation (gratuite, ~15 minutes, une seule fois)

Flashmap est une petite web-app : elle s'installe sur l'écran d'accueil de l'iPhone et dans le Dock du Mac
comme une vraie app. Tout est gratuit : GitHub héberge l'app et stocke tes POI dans un dépôt privé.

## 1. Compte GitHub
Crée un compte gratuit sur https://github.com si tu n'en as pas.

## 2. Mettre l'app en ligne
1. Sur GitHub : bouton « + » en haut à droite → « New repository ».
   Nom : `flashmap`, visibilité **Public** (obligatoire pour l'hébergement gratuit ; ce dépôt ne contient que le code, aucun de tes POI).
2. Dans le dépôt : « Add file » → « Upload files » → glisse **tous les fichiers de ce dossier** → « Commit changes ».
   Ne mets pas ton fichier mapstr.geojson ici.
3. « Settings » → « Pages » → Source : « Deploy from a branch », Branch : `main`, dossier `/ (root)` → « Save ».
4. Après une à deux minutes, l'app est disponible à `https://TON-PSEUDO.github.io/flashmap/`.

## 3. Créer le dépôt privé pour tes données
1. « + » → « New repository ». Nom : `flashmap-data`, visibilité **Private**, coche « Add a README file » → « Create ».

## 4. Créer le token d'accès
1. Photo de profil → « Settings » → tout en bas « Developer settings » → « Personal access tokens » → « Fine-grained tokens » → « Generate new token ».
2. Nom : `flashmap`. Expiration : la plus longue proposée (note la date : il faudra en générer un nouveau à ce moment-là).
3. « Repository access » → « Only select repositories » → `flashmap-data`.
4. « Permissions » → « Repository permissions » → **Contents : Read and write**.
5. « Generate token » et copie-le (il commence par `github_pat_`). Garde-le dans tes notes : il ne sera plus affiché.

## 5. Sur le Mac (Safari)
1. Ouvre `https://TON-PSEUDO.github.io/flashmap/`.
2. Bouton réglages (en haut à droite) → « Synchronisation » : ton pseudo, `flashmap-data`, le token → « Connecter la synchro ».
3. « Importer un fichier » → choisis `mapstr.geojson` (dans ton zip Mapstr). Tes 4 425 POI arrivent et sont envoyés dans GitHub.
4. Menu Fichier → « Ajouter au Dock ».

## 6. Sur l'iPhone (Safari)
1. Ouvre la même adresse → bouton Partager → « Sur l'écran d'accueil ».
2. Lance l'app depuis l'écran d'accueil → réglages → saisis les mêmes infos de synchro. Tes POI arrivent tout seuls.

## Utilisation
- Appui long sur la carte (ou clic droit sur Mac) : ajouter un POI.
- Toucher un POI : fiche avec tags, itinéraire à pied / en voiture, suppression. L'épingle sélectionnée se déplace en la faisant glisser.
- Bandeau de tags : filtrer (plusieurs tags possibles). « A flasher » est actif au lancement.
- Réglages : créer, renommer, recolorer, réordonner, supprimer les tags ; importer ; exporter en GeoJSON, CSV ou sauvegarde complète.
- Bouton calques : vue satellite. Bouton viseur : ta position.

## Mettre à jour l'app plus tard
Remplace les fichiers dans le dépôt `flashmap`. La nouvelle version s'applique au lancement suivant.

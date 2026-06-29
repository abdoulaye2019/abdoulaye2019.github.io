# Portfolio — Abdoulaye Leye

Site portfolio de **Abdoulaye Leye**, *Senior Information Management Associate* au Bureau régional UNHCR pour l'Afrique de l'Ouest et Centrale (RBWCA).

🌐 **En ligne :** https://abdoulaye2019.github.io
🗂️ **Stack :** HTML / CSS / JavaScript statiques, déployés via **GitHub Pages** — aucun framework, aucune étape de build.

Ce README est un **guide de maintenance** : comment modifier le site soi-même, section par section.

---

## 🧭 Principe directeur

> **Uniquement vérifiable.** On n'affiche que des faits et des chiffres documentables et défendables en entretien. Un fait qualitatif réel (« repérée par 3 Senior Managers HQ ») vaut mieux qu'une métrique non sourcée. Pas de superlatifs creux, pas d'auto-notation en étoiles.

---

## 📁 Structure des fichiers

```
abdoulaye2019.github.io/
├── index.html          # Page unique (toutes les sections)
├── cv.html             # CV imprimable (Ctrl+P → Enregistrer en PDF)
├── css/
│   └── style.css       # Design system + tous les composants
├── js/
│   ├── i18n.js         # Moteur bilingue FR/EN (dictionnaire)
│   └── script.js       # Nav, menu mobile, animations, formulaire
├── assets/
│   ├── CV_Abdoulaye_Leye.pdf       # CV téléchargeable (à régénérer depuis cv.html)
│   └── images/
│       ├── profile.png             # Photo du hero
│       ├── topo-contours.svg       # Motif d'arrière-plan
│       ├── badge-*.png             # Badges de certification
│       └── projects/               # Visuels des projets phares (SVG/PNG)
└── projects/           # Pages détaillées + archives (Salifort, etc.)
```

---

## ✏️ Modifier le contenu

### Le système bilingue (IMPORTANT)

Tout texte traduit porte un attribut `data-i18n="clé"` dans `index.html`. Le texte réel vit dans **`js/i18n.js`**, dans deux dictionnaires : `fr` et `en`.

**Règle d'or :** toute clé doit exister **dans les deux langues**. Si vous ajoutez `data-i18n="ma.cle"` dans le HTML, ajoutez `"ma.cle": "..."` **à la fois** dans le bloc `fr` ET dans le bloc `en` de `i18n.js`.

Le texte écrit en dur dans le HTML sert de **secours** (affiché si JS désactivé) — gardez-le en français.

> ✅ Vérifier qu'aucune clé ne manque (PowerShell) :
> ```powershell
> $html = Get-Content index.html -Raw; $js = Get-Content js/i18n.js -Raw
> [regex]::Matches($html,'data-i18n(?:-html)?="([^"]+)"') | %{ $_.Groups[1].Value } | sort -Unique | %{
>   $n = ([regex]::Matches($js, '"'+[regex]::Escape($_)+'":')).Count
>   if ($n -lt 2) { "INCOMPLET ($n/2): $_" } }
> ```

### Ajouter / modifier un **projet phare**

Dans `index.html`, section `#projects`, dupliquez un bloc `<article class="case">` (ajoutez `case--flip` pour inverser image/texte) :

```html
<article class="case" data-reveal>
    <div class="case__media">
        <div class="case__frame">
            <img src="assets/images/projects/MON-IMAGE.svg" alt="..." loading="lazy">
        </div>
        <span class="case__badge"><i class="fas fa-..."></i> Badge</span>
    </div>
    <div class="case__body">
        <span class="case__cat" data-i18n="proj.x.cat">Catégorie</span>
        <h3 class="case__title" data-i18n="proj.x.title">Titre</h3>
        <p class="case__text" data-i18n="proj.x.body">Contexte…</p>
        <div class="case__impact">
            <span class="lbl" data-i18n="proj.impact_label">Impact</span>
            <p data-i18n="proj.x.impact">Impact réel et vérifiable…</p>
        </div>
        <div class="case__stack"><span class="tag">Outil</span></div>
    </div>
</article>
```
Puis ajoutez les clés `proj.x.*` dans `i18n.js` (FR + EN). Les `tag` (technos) ne se traduisent pas.

### Ajouter / modifier une **réalisation secondaire**

Dupliquez un `<article class="pcard">` dans la grille `.pgrid` (icône Font Awesome + titre + description + tags) et ajoutez les clés i18n.

### Remplacer un **visuel de projet**

Déposez votre image dans `assets/images/projects/` et pointez le `src`. Pour garder les placeholders actuels, **utilisez le même nom de fichier** (`proj-rbwca.svg`, `proj-earlywarning.svg`, `proj-mali.svg`) — ou changez l'extension dans le `src` (`.png`, `.jpg`).

### Mettre à jour les **certifications**

Section `#certifications`. Deux vedettes (`.cert-feat`) + une liste (`.cert-row`). Pour ajouter une ligne, dupliquez un `.cert-row` ; mettez le **lien de vérification** réel dans le `<a class="verify">` (sinon, retirez le lien).

---

## 🪪 Mettre à jour le CV

Le CV est la page **`cv.html`** (à votre charte, format A4).

1. Modifiez le texte directement dans `cv.html`.
2. Ouvrez `cv.html` dans le navigateur → **`Ctrl + P`** → *Destination : Enregistrer au format PDF* → marges « par défaut ».
3. Pour mettre à jour le **PDF téléchargeable**, enregistrez-le sous `assets/CV_Abdoulaye_Leye.pdf` (même nom).

Le bouton « CV » du portfolio ouvre `cv.html`.

---

## 🎨 Repères de design (`css/style.css`, bloc `:root`)

| Variable | Valeur | Usage |
|---|---|---|
| `--accent` | `#0072BC` | Bleu institutionnel UNHCR |
| `--ink` | `#0E1B2A` | Texte principal |
| `--paper` | `#FBFAF7` | Fond papier chaud |
| `--ember` | `#C0561F` | Accent terracotta (parcimonieux) |
| `--font-display` | Fraunces | Titres |
| `--font-body` | IBM Plex Sans | Corps |
| `--font-mono` | IBM Plex Mono | Étiquettes / données |

---

## 👀 Prévisualiser en local

Ouvrez simplement `index.html` dans un navigateur. Pour un rendu fidèle (chemins relatifs) :

```bash
python -m http.server 8000
# puis http://localhost:8000
```

---

## 🚀 Déployer

Le site est servi depuis la branche **`main`** par GitHub Pages. Pour publier :

```bash
git add -A
git commit -m "Votre message"
git push origin main
```
La mise en ligne prend ~1–2 minutes.

---

© Abdoulaye Leye — Dakar, Sénégal.

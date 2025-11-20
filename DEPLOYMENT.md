# Guide de Déploiement du Portfolio

## Étape 1: Authentification GitHub

Vous avez plusieurs options pour vous authentifier :

### Option A: GitHub CLI (Recommandé)
```bash
# Installer GitHub CLI si pas déjà installé
# Télécharger depuis: https://cli.github.com/

# Se connecter
gh auth login
```

### Option B: Personal Access Token
1. Allez sur https://github.com/settings/tokens
2. Cliquez sur "Generate new token" → "Generate new token (classic)"
3. Donnez un nom au token (ex: "Portfolio Token")
4. Sélectionnez les permissions: **repo** (toutes les sous-options)
5. Cliquez sur "Generate token"
6. **COPIEZ LE TOKEN** (vous ne pourrez plus le voir après)

Ensuite, utilisez le token pour pousser :
```bash
cd ~/temp-portfolio
git push origin main
# Username: abdoulaye2019
# Password: [COLLEZ VOTRE TOKEN ICI]
```

### Option C: SSH (Pour les utilisateurs avancés)
```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "samayayendiaye01@gmail.com"

# Ajouter la clé à GitHub
# Copiez le contenu de ~/.ssh/id_ed25519.pub
# Allez sur GitHub → Settings → SSH and GPG keys → New SSH key

# Changer l'URL du remote
cd ~/temp-portfolio
git remote set-url origin git@github.com:abdoulaye2019/abdoulaye2019.github.io.git
git push origin main
```

## Étape 2: Vérifier le déploiement

Une fois poussé avec succès, GitHub Pages se déploiera automatiquement.

1. Allez sur https://github.com/abdoulaye2019/abdoulaye2019.github.io
2. Cliquez sur "Settings" → "Pages"
3. Vérifiez que la source est bien "Deploy from a branch: main"
4. Votre site sera disponible à : **https://abdoulaye2019.github.io**

⏰ Le déploiement peut prendre 2-5 minutes

## Étape 3: Tester le site

Après le déploiement, visitez :
- **Homepage**: https://abdoulaye2019.github.io
- **Projet Salifort**: https://abdoulaye2019.github.io/projects/salifort-motors.html

## Mises à jour futures

Pour mettre à jour votre portfolio :

```bash
cd ~/temp-portfolio

# Faire vos modifications
# Par exemple, ajouter une nouvelle image de projet :
cp /path/to/image.jpg assets/images/

# Ajouter et commiter
git add .
git commit -m "Description de vos changements"

# Pousser vers GitHub
git push origin main
```

## Résolution de problèmes

### Erreur d'authentification
Si vous avez une erreur "Authentication failed" :
- Assurez-vous d'utiliser un token, pas votre mot de passe GitHub
- Vérifiez que le token a les bonnes permissions (repo)

### Le site ne se met pas à jour
1. Allez sur https://github.com/abdoulaye2019/abdoulaye2019.github.io/actions
2. Vérifiez que le workflow "pages build and deployment" est terminé
3. Attendez quelques minutes et rafraîchissez votre navigateur (Ctrl+F5)

### Images manquantes
Les images placeholder doivent être ajoutées manuellement dans `assets/images/` :
- `salifort-project.jpg` - Image du projet Salifort Motors
- `covid-dashboard.jpg` - Image du dashboard COVID-19
- `construction-monitoring.jpg` - Image du système de construction
- `gis-platform.jpg` - Image de la plateforme GIS

Vous pouvez utiliser des sites comme Unsplash pour des images gratuites :
- https://unsplash.com/s/photos/data-analytics
- https://unsplash.com/s/photos/dashboard
- https://unsplash.com/s/photos/construction

## Contact et Support

Si vous rencontrez des problèmes, vous pouvez :
- Vérifier la documentation GitHub Pages : https://docs.github.com/en/pages
- Me contacter pour assistance

---

Bon déploiement ! 🚀

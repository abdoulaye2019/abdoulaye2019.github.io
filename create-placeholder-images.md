# Guide pour Créer des Images Placeholder

## Images Nécessaires

Vous avez besoin de 4 images pour les projets (800x500px recommandé) :

1. `salifort-project.jpg` - Projet Salifort Motors HR Analytics
2. `covid-dashboard.jpg` - Dashboard COVID-19
3. `construction-monitoring.jpg` - Système de suivi de construction
4. `gis-platform.jpg` - Plateforme AIT

## Option 1: Télécharger depuis Unsplash (Recommandé)

### Pour Salifort Motors (HR Analytics)
https://unsplash.com/s/photos/data-analytics-dashboard
ou
https://unsplash.com/s/photos/hr-analytics

**Mots-clés** : data analytics, dashboard, charts, business analytics, hr

### Pour COVID-19 Dashboard
https://unsplash.com/s/photos/covid-dashboard
ou
https://unsplash.com/s/photos/epidemic-data

**Mots-clés** : covid, pandemic, data visualization, healthcare dashboard

### Pour Construction Monitoring
https://unsplash.com/s/photos/construction-site
ou
https://unsplash.com/s/photos/building-construction

**Mots-clés** : construction, building, architecture, site monitoring

### Pour GIS Platform
https://unsplash.com/s/photos/gis-map
ou
https://unsplash.com/s/photos/geographic-map

**Mots-clés** : map, gis, geographic, spatial data, cartography

## Option 2: Utiliser Pexels

Allez sur https://www.pexels.com et cherchez les mêmes mots-clés.

## Option 3: Créer avec Python (Si vous avez PIL/Pillow)

```python
from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder(filename, title, color):
    # Créer une image 800x500
    img = Image.new('RGB', (800, 500), color=color)
    draw = ImageDraw.Draw(img)

    # Ajouter le texte (optionnel, nécessite une police)
    # draw.text((400, 250), title, fill='white', anchor='mm')

    # Sauvegarder
    img.save(f'assets/images/{filename}')
    print(f"✅ Créé: {filename}")

# Créer les placeholders
os.makedirs('assets/images', exist_ok=True)

create_placeholder('salifort-project.jpg', 'Salifort Motors', '#4F46E5')
create_placeholder('covid-dashboard.jpg', 'COVID-19 Dashboard', '#DC2626')
create_placeholder('construction-monitoring.jpg', 'Construction Monitoring', '#F59E0B')
create_placeholder('gis-platform.jpg', 'GIS Platform', '#10B981')

print("\n✅ Tous les placeholders ont été créés!")
```

Pour exécuter :
```bash
pip install pillow
python create-placeholder-images.py
```

## Option 4: Utiliser vos Propres Captures d'Écran

Si vous avez déjà ces projets :
1. Prenez des captures d'écran de haute qualité
2. Utilisez un outil comme GIMP, Photoshop ou Paint.NET pour :
   - Redimensionner à 800x500px
   - Ajuster la luminosité/contraste
   - Exporter en JPG (qualité 85-90%)
3. Placez-les dans `assets/images/`

## Instructions Après Téléchargement

1. **Renommez les fichiers exactement comme suit** :
   - `salifort-project.jpg`
   - `covid-dashboard.jpg`
   - `construction-monitoring.jpg`
   - `gis-platform.jpg`

2. **Placez-les dans** : `~/temp-portfolio/assets/images/`

3. **Vérifiez les dimensions** (optionnel mais recommandé) :
   ```bash
   cd ~/temp-portfolio/assets/images
   file *.jpg
   ```

4. **Commitez et poussez** :
   ```bash
   cd ~/temp-portfolio
   git add assets/images/*.jpg
   git commit -m "Add project images"
   git push origin main
   ```

## Conseils pour de Bonnes Images

✅ **Résolution** : Minimum 800x500px (ratio 16:10)
✅ **Format** : JPG pour photos, PNG pour graphiques
✅ **Poids** : Moins de 500KB par image (optimiser avec TinyPNG.com)
✅ **Style** : Professionnel, clair, représentatif du projet
✅ **Luminosité** : Ni trop sombre ni trop claire
✅ **Texte** : Lisible si présent dans l'image

## ⚠️ Important

Sans ces images, le site fonctionnera mais affichera des images manquantes (broken image icon). Ce n'est pas bloquant pour le déploiement, mais c'est mieux de les avoir !

## Alternative Temporaire

Si vous n'avez pas le temps maintenant, vous pouvez :
1. Déployer le site sans les images
2. Les ajouter plus tard
3. Le site affichera juste le titre et la description des projets (ce qui est acceptable)

Pour un déploiement professionnel, je recommande d'ajouter les images avant ou juste après le premier déploiement.

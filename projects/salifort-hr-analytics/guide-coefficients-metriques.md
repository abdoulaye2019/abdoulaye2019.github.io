# Guide Complet : Coefficients et Métriques en Machine Learning

## 📚 Table des matières
1. [Les Coefficients de Régression Logistique](#coefficients)
2. [La Matrice de Confusion](#matrice)
3. [Les Métriques de Performance](#metriques)
4. [Interprétation Pratique pour le Projet Salifort](#interpretation)

---

## 1. Les Coefficients de Régression Logistique {#coefficients}

### 🎯 Qu'est-ce qu'un coefficient ?

Un **coefficient** (ou poids) représente l'**influence** d'une variable sur la probabilité qu'un employé quitte l'entreprise. C'est comme mesurer la force de chaque facteur dans la décision de départ.

### 📊 Comment lire les coefficients ?

| Coefficient | Signification | Exemple |
|------------|---------------|---------|
| **Positif (+)** | ↑ La variable **augmente** le risque de départ | `number_project = +0.52` → Plus de projets = plus de risque |
| **Négatif (-)** | ↓ La variable **diminue** le risque de départ | `satisfaction_level = -4.16` → Plus de satisfaction = moins de risque |
| **Proche de 0** | La variable a **peu d'influence** | `work_accident = -0.02` → Impact négligeable |

### 🔍 Interprétation avec Odds Ratio

Pour mieux comprendre l'impact, on utilise l'**Odds Ratio** = `e^(coefficient)`

**Formule :** `Odds Ratio = exp(coefficient)`

#### Exemple concret avec le projet Salifort :

```python
Coefficient de satisfaction_level = -4.16

Odds Ratio = e^(-4.16) = 0.0156 ≈ 0.016

Interprétation :
Pour chaque augmentation de 1 point de satisfaction (sur une échelle 0-1),
les chances de départ sont multipliées par 0.016, soit une RÉDUCTION de 98.4% !
```

### 📈 Tableau des coefficients importants (Projet Salifort)

| Variable | Coefficient | Odds Ratio | Interprétation |
|----------|-------------|------------|----------------|
| `satisfaction_level` | **-4.16** | 0.016 | ↓ 98.4% - **Forte rétention** avec satisfaction élevée |
| `last_evaluation` | **+3.45** | 31.50 | ↑ 3050% - Évaluations élevées = risque de départ (talents chassés) |
| `number_project` | **+0.52** | 1.68 | ↑ 68% - Chaque projet supplémentaire augmente le risque |
| `average_monthly_hours` | **+0.004** | 1.004 | ↑ 0.4% par heure - Impact faible mais cumulatif |
| `time_spend_company` | **+0.31** | 1.36 | ↑ 36% par année - Les vétérans partent plus |
| `work_accident` | **-1.44** | 0.24 | ↓ 76% - Accidents réduisent le départ (soutien post-accident?) |
| `promotion_last_5years` | **-1.31** | 0.27 | ↓ 73% - **Les promotions retiennent fortement** |

### 🎓 Pourquoi c'est important ?

**1. Identifier les leviers d'action**
- Satisfaction et promotions ont l'impact le plus fort
- Focus RH sur ces facteurs = meilleur ROI

**2. Quantifier l'effet**
- "Augmenter la satisfaction de 0.1 réduit le risque de 18%"
- Arguments chiffrés pour la direction

**3. Détecter les paradoxes**
- Évaluations élevées → départ (talents volés)
- Accidents → rétention (à investiguer!)

---

## 2. La Matrice de Confusion {#matrice}

### 🧩 Qu'est-ce que c'est ?

La **matrice de confusion** est un tableau qui montre les **4 types de prédictions** possibles :

```
                    PRÉDICTION
                  Resté    Parti
         Resté  [  TN   |   FP  ]  ← Vrai Négatif | Faux Positif
RÉALITÉ          |------+-------|
         Parti  [  FN   |   TP  ]  ← Faux Négatif | Vrai Positif
```

### 📊 Les 4 cases expliquées

#### ✅ **TN (True Negative) - Vrai Négatif**
- **Réalité** : L'employé est resté
- **Prédiction** : Le modèle prédit qu'il reste
- **Résultat** : ✅ **CORRECT !**
- **Exemple** : "Marc est satisfait, le modèle dit qu'il reste → Marc reste effectivement"

#### ❌ **FP (False Positive) - Faux Positif**
- **Réalité** : L'employé est resté
- **Prédiction** : Le modèle prédit qu'il part
- **Résultat** : ❌ **ERREUR - Fausse alarme**
- **Conséquence** : RH perd du temps sur un employé qui n'allait pas partir
- **Exemple** : "Sophie est stressée temporairement, le modèle dit qu'elle part → Sophie reste"

#### ⚠️ **FN (False Negative) - Faux Négatif**
- **Réalité** : L'employé est parti
- **Prédiction** : Le modèle prédit qu'il reste
- **Résultat** : ❌ **ERREUR - Départ manqué**
- **Conséquence** : ⚠️ **GRAVE** - Perte de 50K$ de coût de remplacement
- **Exemple** : "Thomas semblait bien, le modèle dit qu'il reste → Thomas démissionne surprise!"

#### ✅ **TP (True Positive) - Vrai Positif**
- **Réalité** : L'employé est parti
- **Prédiction** : Le modèle prédit qu'il part
- **Résultat** : ✅ **CORRECT !**
- **Valeur** : Permet une intervention RH préventive
- **Exemple** : "Julie est à risque, le modèle alerte → Julie démissionne (on aurait pu agir)"

### 📈 Matrice du Modèle Gradient Boosting (Projet Salifort)

```
                       PRÉDICTION
                    Resté      Parti
         Resté   [  1980   |    21   ]  ← 1980 correctes, 21 fausses alarmes
RÉALITÉ             |--------+---------|
         Parti   [   27    |   371   ]  ← 27 manquées, 371 détectées

Total : 2399 employés dans le jeu de test
```

### 💡 Lecture de la matrice

**Ligne 1 (Employés restés = 2001)**
- ✅ 1980 bien identifiés comme "restent" (TN)
- ❌ 21 faussement identifiés comme "partent" (FP)
- **Taux de fausses alarmes** : 21/2001 = 1.05% (excellent!)

**Ligne 2 (Employés partis = 398)**
- ❌ 27 manqués par le modèle (FN) = **$1.35M de pertes**
- ✅ 371 correctement détectés (TP) = **$18.5M économisés**
- **Taux de détection** : 371/398 = 93.2% (recall)

### 🎯 Objectifs selon le contexte

| Contexte | Priorité | Métrique clé |
|----------|----------|--------------|
| **Salifort Motors** | ⚠️ Ne pas manquer de départs | Maximiser **Recall** (TP élevé) |
| **Spam Email** | 📧 Ne pas bloquer vrais emails | Maximiser **Precision** (éviter FP) |
| **Diagnostic Médical** | 🏥 Ne pas rater de maladies | Maximiser **Recall** (détecter tout) |
| **Recommandation Produit** | 🛍️ Ne pas irriter client | Équilibrer Precision & Recall |

---

## 3. Les Métriques de Performance {#metriques}

### 📊 Les 5 métriques essentielles

#### 1️⃣ **Accuracy (Exactitude)**
```
Formule : (TP + TN) / Total
        = (Prédictions correctes) / (Toutes les prédictions)

Projet Salifort :
(371 + 1980) / 2399 = 98.1%
```

**Signification** : Le modèle est correct dans **98.1% des cas**

**⚠️ Attention** : Métrique trompeuse si classes déséquilibrées !

**Exemple** : Si 90% des employés restent, un modèle qui dit toujours "resté" aura 90% d'accuracy mais sera inutile.

---

#### 2️⃣ **Precision (Précision)**
```
Formule : TP / (TP + FP)
        = (Vrais positifs) / (Tous les positifs prédits)

Projet Salifort :
371 / (371 + 21) = 371 / 392 = 94.6%
```

**Question répondue** : "Quand le modèle dit qu'un employé va partir, quelle est la probabilité qu'il parte vraiment ?"

**Interprétation** :
- **94.6%** des employés flaggés comme "à risque" partent effectivement
- Seulement **5.4%** de fausses alarmes
- RH peut faire confiance aux alertes !

**Cas d'usage** : Important quand les interventions sont coûteuses (temps RH limité)

---

#### 3️⃣ **Recall (Rappel / Sensibilité)**
```
Formule : TP / (TP + FN)
        = (Vrais positifs) / (Tous les positifs réels)

Projet Salifort :
371 / (371 + 27) = 371 / 398 = 93.2%
```

**Question répondue** : "Sur tous les employés qui partent, combien le modèle détecte-t-il ?"

**Interprétation** :
- Le modèle détecte **93.2%** des départs réels
- Seulement **27 départs manqués** sur 398 (6.8%)
- **$1.35M de pertes** vs **$18.5M économisés**

**⚠️ CRITIQUE pour Salifort** :
- Manquer un départ coûte 50K$
- Fausse alarme coûte quelques heures RH
- **Priorité absolue : maximiser le Recall !**

---

#### 4️⃣ **F1-Score (Score F1)**
```
Formule : 2 × (Precision × Recall) / (Precision + Recall)
        = Moyenne harmonique de Precision et Recall

Projet Salifort :
2 × (0.946 × 0.932) / (0.946 + 0.932) = 94.2%
```

**Signification** : Équilibre entre Precision et Recall

**Quand l'utiliser** :
- Classes déséquilibrées (23% départs vs 77% restés)
- On veut un compromis entre les deux métriques
- **Utile pour comparer des modèles**

**Note** : F1 pénalise les modèles déséquilibrés (bon Recall mais mauvaise Precision ou vice-versa)

---

#### 5️⃣ **ROC-AUC (Area Under the Curve)**
```
Formule : Aire sous la courbe ROC
        = Mesure globale de discrimination

Projet Salifort :
ROC-AUC = 0.981 (98.1%)
```

**Signification** : Capacité du modèle à **distinguer** entre les deux classes

**Échelle d'interprétation** :
| ROC-AUC | Qualité | Interprétation |
|---------|---------|----------------|
| **0.90 - 1.00** | ⭐⭐⭐⭐⭐ Excellent | Discrimination quasi-parfaite |
| **0.80 - 0.90** | ⭐⭐⭐⭐ Très bon | Bonne séparation |
| **0.70 - 0.80** | ⭐⭐⭐ Acceptable | Modèle utilisable |
| **0.60 - 0.70** | ⭐⭐ Faible | À améliorer |
| **0.50 - 0.60** | ⭐ Très faible | Presque aléatoire |
| **0.50** | ❌ Aléatoire | Comme lancer une pièce |

**Notre modèle : 0.981 = ⭐⭐⭐⭐⭐ EXCELLENT**

**Avantage** : Indépendant du seuil de décision (0.3, 0.5, 0.7...)

---

### 📊 Tableau récapitulatif des métriques (Gradient Boosting)

| Métrique | Valeur | Interprétation Business |
|----------|--------|-------------------------|
| **Accuracy** | 98.1% | 98 prédictions correctes sur 100 |
| **Precision** | 94.6% | 95% des alertes sont justifiées |
| **Recall** | 93.2% | 93% des départs sont détectés |
| **F1-Score** | 94.2% | Excellent équilibre global |
| **ROC-AUC** | 98.1% | Discrimination quasi-parfaite |

### 🎯 Trade-off Precision vs Recall

```
Si on augmente le seuil (ex: 0.5 → 0.7) :
├─ Precision ↑ (moins de fausses alarmes)
└─ Recall ↓ (on rate plus de départs)

Si on baisse le seuil (ex: 0.5 → 0.3) :
├─ Precision ↓ (plus de fausses alarmes)
└─ Recall ↑ (on détecte plus de départs)

Pour Salifort : Seuil = 0.3 (favorise le Recall)
```

---

## 4. Interprétation Pratique pour le Projet Salifort {#interpretation}

### 🎯 Scénario d'utilisation mensuelle

**1. Exécution du modèle**
```python
Janvier 2025 : 1500 employés analysés
Prédictions :
- 1425 employés classés "restera" (score < 0.3)
- 75 employés classés "à risque" (score ≥ 0.3)
```

**2. Interprétation avec nos métriques**

**Precision = 94.6%** signifie :
- Sur les 75 employés flaggés, environ **71 partiront vraiment**
- Seulement **4 fausses alarmes** (coût : ~20 heures RH)

**Recall = 93.2%** signifie :
- Si 76 employés partent réellement ce mois-ci
- Le modèle en détectera **71**
- Et en ratera **5** (coût : 5 × 50K$ = 250K$)

**3. Action RH**

**Pour les 75 employés à risque :**
1. ✅ **Intervention immédiate** : Entretien 1-on-1 avec manager
2. ✅ **Analyse du score** :
   - Score 0.8-1.0 (très haut risque) → Action urgente (promotion, ajustement salarial)
   - Score 0.5-0.8 (risque moyen) → Plan de développement
   - Score 0.3-0.5 (risque faible) → Surveillance accrue

**ROI estimé :**
- 71 départs évités × 50K$ = **$3.55M économisés**
- 4 fausses alarmes × 5h RH × 50$/h = **$1,000 perdus**
- **ROI net = $3.549M par mois !**

### 📈 Comparaison des 3 modèles

| Modèle | Precision | Recall | F1 | ROC-AUC | Meilleur pour... |
|--------|-----------|--------|----|---------|--------------------|
| **Gradient Boosting** | **95.1%** | **93.2%** | **94.2%** | **98.1%** | ⭐ **PRODUCTION** - Meilleur équilibre |
| Random Forest | **98.9%** | 92.7% | 95.7% | 97.8% | Minimiser fausses alarmes |
| Logistic Regression | 39.8% | **87.9%** | 54.8% | 87.2% | Baseline / Interprétabilité |

### 🎓 Conclusion : Pourquoi le Gradient Boosting gagne ?

**1. ROC-AUC le plus élevé (98.1%)**
- Meilleure capacité de discrimination globale

**2. Recall élevé (93.2%)**
- Ne rate que 27 départs sur 398 = $1.35M de pertes
- Alternative : Logistic Regression rate 48 départs = $2.4M de pertes

**3. Precision excellente (95.1%)**
- Seulement 5% de fausses alarmes
- RH peut faire confiance aux prédictions

**4. Robustesse**
- Validation croisée cohérente (92.7% recall en CV)
- Peu de sur-apprentissage

**5. Interprétabilité suffisante**
- Feature importance disponible
- Permet d'identifier les leviers d'action

---

## 📚 Ressources et Références

### Formules mathématiques complètes

```python
# Métriques de base
Accuracy = (TP + TN) / (TP + TN + FP + FN)
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
F1-Score = 2 × (Precision × Recall) / (Precision + Recall)

# Métriques avancées
Specificity = TN / (TN + FP)  # Taux de vrais négatifs
FPR = FP / (TN + FP)          # Taux de faux positifs
FNR = FN / (TP + FN)          # Taux de faux négatifs

# ROC-AUC : Intégrale de la courbe TPR vs FPR
ROC-AUC = ∫[0 to 1] TPR(FPR) d(FPR)
```

### Liens utiles
- [Scikit-learn - Classification Metrics](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [Google ML Crash Course - ROC & AUC](https://developers.google.com/machine-learning/crash-course/classification/roc-and-auc)
- [Confusion Matrix Explained](https://towardsdatascience.com/understanding-confusion-matrix-a9ad42dcfd62)

---

**Auteur** : Abdoulaye Leye
**Projet** : Salifort Motors HR Analytics
**Date** : Novembre 2025
**Certification** : Google Advanced Data Analytics

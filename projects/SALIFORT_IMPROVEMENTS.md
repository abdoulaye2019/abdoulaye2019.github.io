# Améliorations Professionnelles pour l'Analyse Salifort Motors

## 📊 Suggestions pour Rendre l'Analyse Plus Professionnelle

### 1. Structure du Notebook

#### En-tête Professionnel
```python
"""
==========================================================================
SALIFORT MOTORS - ANALYSE PRÉDICTIVE DU TURNOVER DES EMPLOYÉS
==========================================================================

Auteur: Abdoulaye Leye
Date: Novembre 2025
Projet: Google Advanced Data Analytics Capstone
Contact: samayayendiaye01@gmail.com | LinkedIn: abdoulaye-leye

OBJECTIF:
Développer un modèle prédictif pour identifier les employés à risque de
départ et fournir des recommandations data-driven au département RH.

MÉTHODOLOGIE:
- Analyse exploratoire des données (EDA)
- Feature engineering et preprocessing
- Modélisation avec régression logistique
- Évaluation et interprétation des résultats
==========================================================================
"""
```

### 2. Améliorer les Visualisations

#### Palette de Couleurs Cohérente
```python
# Définir une palette professionnelle
COLORS = {
    'primary': '#667eea',
    'secondary': '#764ba2',
    'accent': '#f093fb',
    'danger': '#f5576c',
    'success': '#10b981',
    'warning': '#f59e0b'
}

# Style uniforme pour tous les graphiques
import matplotlib.pyplot as plt
import seaborn as sns

plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette([COLORS['primary'], COLORS['accent'],
                 COLORS['success'], COLORS['danger']])

# Configuration globale
plt.rcParams['figure.figsize'] = (12, 6)
plt.rcParams['font.size'] = 11
plt.rcParams['axes.titlesize'] = 14
plt.rcParams['axes.labelsize'] = 12
```

#### Graphiques Professionnels avec Annotations
```python
def create_turnover_analysis(df):
    """
    Créer une visualisation professionnelle du turnover.

    Parameters:
    -----------
    df : pandas.DataFrame
        Dataset avec la colonne 'left'

    Returns:
    --------
    matplotlib.figure.Figure
    """
    fig, axes = plt.subplots(1, 2, figsize=(14, 5))

    # Graphique 1: Taux de turnover
    turnover_rate = df['left'].value_counts(normalize=True) * 100
    bars = axes[0].bar(['Stayed', 'Left'], turnover_rate.values,
                       color=[COLORS['success'], COLORS['danger']])

    # Ajouter les valeurs sur les barres
    for bar in bars:
        height = bar.get_height()
        axes[0].text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}%',
                    ha='center', va='bottom', fontweight='bold')

    axes[0].set_title('Distribution du Turnover', fontweight='bold', pad=20)
    axes[0].set_ylabel('Pourcentage (%)')
    axes[0].spines['top'].set_visible(False)
    axes[0].spines['right'].set_visible(False)

    # Graphique 2: Nombre total
    turnover_count = df['left'].value_counts()
    axes[1].pie(turnover_count.values, labels=['Stayed', 'Left'],
                autopct='%1.1f%%', startangle=90,
                colors=[COLORS['success'], COLORS['danger']])
    axes[1].set_title('Répartition des Employés', fontweight='bold', pad=20)

    plt.suptitle('Analyse du Turnover - Salifort Motors',
                 fontsize=16, fontweight='bold', y=1.02)
    plt.tight_layout()

    return fig

# Utilisation
fig = create_turnover_analysis(df)
plt.show()
```

### 3. Analyse Statistique Détaillée

#### Tests Statistiques
```python
from scipy import stats

def statistical_analysis(df):
    """
    Effectuer des tests statistiques pour identifier les variables significatives.
    """
    print("=" * 70)
    print("TESTS STATISTIQUES - VARIABLES vs TURNOVER")
    print("=" * 70)

    # Variables continues
    continuous_vars = ['satisfaction_level', 'last_evaluation',
                      'average_monthly_hours', 'time_spend_company']

    results = []
    for var in continuous_vars:
        stayed = df[df['left'] == 0][var]
        left = df[df['left'] == 1][var]

        # T-test
        t_stat, p_value = stats.ttest_ind(stayed, left)

        # Effect size (Cohen's d)
        pooled_std = np.sqrt((stayed.std()**2 + left.std()**2) / 2)
        cohens_d = (stayed.mean() - left.mean()) / pooled_std

        results.append({
            'Variable': var,
            'Mean_Stayed': stayed.mean(),
            'Mean_Left': left.mean(),
            'p-value': p_value,
            'Cohens_d': abs(cohens_d),
            'Significance': '***' if p_value < 0.001 else
                          '**' if p_value < 0.01 else
                          '*' if p_value < 0.05 else 'ns'
        })

    results_df = pd.DataFrame(results)
    print("\n", results_df.to_string(index=False))
    print("\nSignificance: *** p<0.001, ** p<0.01, * p<0.05, ns non-significatif")
    print("=" * 70)

    return results_df
```

### 4. Feature Engineering Avancé

```python
def create_advanced_features(df):
    """
    Créer des features avancées pour améliorer le modèle.
    """
    df = df.copy()

    # 1. Ratio heures/projet
    df['hours_per_project'] = df['average_monthly_hours'] / df['number_project']

    # 2. Satisfaction vs Évaluation (tension)
    df['satisfaction_evaluation_gap'] = abs(df['satisfaction_level'] - df['last_evaluation'])

    # 3. Catégorisation de la charge de travail
    df['workload_category'] = pd.cut(df['average_monthly_hours'],
                                     bins=[0, 160, 200, 240, 400],
                                     labels=['Normal', 'Élevé', 'Très élevé', 'Burnout'])

    # 4. Tenure groups
    df['tenure_group'] = pd.cut(df['time_spend_company'],
                                bins=[0, 2, 4, 6, 20],
                                labels=['Nouveau', 'Junior', 'Senior', 'Expert'])

    # 5. Performance score (satisfaction + évaluation)
    df['performance_score'] = (df['satisfaction_level'] + df['last_evaluation']) / 2

    # 6. Overworked flag
    df['is_overworked'] = (df['average_monthly_hours'] > 240).astype(int)

    # 7. High performer flag
    df['is_high_performer'] = ((df['last_evaluation'] > 0.8) &
                               (df['satisfaction_level'] > 0.7)).astype(int)

    return df
```

### 5. Modélisation Professionnelle

#### Cross-Validation et Optimisation
```python
from sklearn.model_selection import GridSearchCV, StratifiedKFold
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve

def train_optimized_model(X_train, y_train):
    """
    Entraîner un modèle optimisé avec GridSearchCV.
    """
    print("=" * 70)
    print("OPTIMISATION DU MODÈLE - GRID SEARCH")
    print("=" * 70)

    # Définir les paramètres à tester
    param_grid = {
        'C': [0.001, 0.01, 0.1, 1, 10, 100],
        'penalty': ['l1', 'l2'],
        'solver': ['liblinear', 'saga'],
        'class_weight': [None, 'balanced']
    }

    # Cross-validation stratifiée
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # Grid Search
    grid_search = GridSearchCV(
        LogisticRegression(random_state=42, max_iter=1000),
        param_grid,
        cv=cv,
        scoring='roc_auc',
        n_jobs=-1,
        verbose=1
    )

    grid_search.fit(X_train, y_train)

    print(f"\nMeilleurs paramètres: {grid_search.best_params_}")
    print(f"Meilleur score (ROC-AUC): {grid_search.best_score_:.4f}")
    print("=" * 70)

    return grid_search.best_estimator_
```

#### Évaluation Complète du Modèle
```python
def evaluate_model_professionally(model, X_test, y_test):
    """
    Évaluation professionnelle et complète du modèle.
    """
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]

    print("=" * 70)
    print("ÉVALUATION DU MODÈLE")
    print("=" * 70)

    # Rapport de classification
    print("\n1. RAPPORT DE CLASSIFICATION")
    print("-" * 70)
    print(classification_report(y_test, y_pred,
                                target_names=['Stayed', 'Left']))

    # Matrice de confusion
    print("\n2. MATRICE DE CONFUSION")
    print("-" * 70)
    cm = confusion_matrix(y_test, y_pred)
    print(f"True Negatives:  {cm[0,0]:>6} | False Positives: {cm[0,1]:>6}")
    print(f"False Negatives: {cm[1,0]:>6} | True Positives:  {cm[1,1]:>6}")

    # Métriques additionnelles
    print("\n3. MÉTRIQUES AVANCÉES")
    print("-" * 70)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    print(f"ROC-AUC Score: {roc_auc:.4f}")

    # Feature importance
    print("\n4. IMPORTANCE DES VARIABLES (Top 10)")
    print("-" * 70)
    feature_importance = pd.DataFrame({
        'Feature': X_test.columns,
        'Coefficient': model.coef_[0]
    }).sort_values('Coefficient', key=abs, ascending=False).head(10)

    print(feature_importance.to_string(index=False))
    print("=" * 70)

    return y_pred, y_pred_proba
```

### 6. Visualisations des Résultats

```python
def plot_model_results(y_test, y_pred, y_pred_proba):
    """
    Créer des visualisations professionnelles des résultats.
    """
    fig, axes = plt.subplots(2, 2, figsize=(14, 12))

    # 1. Matrice de confusion
    from sklearn.metrics import ConfusionMatrixDisplay
    cm = confusion_matrix(y_test, y_pred)
    disp = ConfusionMatrixDisplay(cm, display_labels=['Stayed', 'Left'])
    disp.plot(ax=axes[0,0], cmap='Blues')
    axes[0,0].set_title('Matrice de Confusion', fontweight='bold', pad=15)

    # 2. Courbe ROC
    fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
    roc_auc = roc_auc_score(y_test, y_pred_proba)
    axes[0,1].plot(fpr, tpr, linewidth=2, label=f'ROC curve (AUC = {roc_auc:.3f})')
    axes[0,1].plot([0, 1], [0, 1], 'k--', linewidth=1)
    axes[0,1].set_xlabel('False Positive Rate')
    axes[0,1].set_ylabel('True Positive Rate')
    axes[0,1].set_title('Courbe ROC', fontweight='bold', pad=15)
    axes[0,1].legend()
    axes[0,1].grid(alpha=0.3)

    # 3. Distribution des probabilités
    axes[1,0].hist(y_pred_proba[y_test==0], bins=50, alpha=0.6,
                   label='Stayed', color=COLORS['success'])
    axes[1,0].hist(y_pred_proba[y_test==1], bins=50, alpha=0.6,
                   label='Left', color=COLORS['danger'])
    axes[1,0].set_xlabel('Probabilité prédite')
    axes[1,0].set_ylabel('Fréquence')
    axes[1,0].set_title('Distribution des Probabilités', fontweight='bold', pad=15)
    axes[1,0].legend()

    # 4. Précision vs Recall
    from sklearn.metrics import precision_recall_curve
    precision, recall, _ = precision_recall_curve(y_test, y_pred_proba)
    axes[1,1].plot(recall, precision, linewidth=2)
    axes[1,1].set_xlabel('Recall')
    axes[1,1].set_ylabel('Precision')
    axes[1,1].set_title('Courbe Précision-Recall', fontweight='bold', pad=15)
    axes[1,1].grid(alpha=0.3)

    plt.suptitle('Évaluation du Modèle - Salifort Motors',
                 fontsize=16, fontweight='bold', y=1.00)
    plt.tight_layout()

    return fig
```

### 7. Recommandations Structurées

```python
def generate_recommendations(feature_importance, model, df):
    """
    Générer des recommandations basées sur les résultats du modèle.
    """
    print("=" * 70)
    print("RECOMMANDATIONS DATA-DRIVEN POUR LE DÉPARTEMENT RH")
    print("=" * 70)

    print("\n1. FACTEURS CLÉS DE TURNOVER (basé sur le modèle)")
    print("-" * 70)
    top_features = feature_importance.head(5)
    for idx, row in top_features.iterrows():
        print(f"   • {row['Feature']}: Coefficient = {row['Coefficient']:.3f}")

    print("\n2. ACTIONS RECOMMANDÉES")
    print("-" * 70)

    recommendations = [
        ("Gestion de la Charge de Travail",
         "Limiter le nombre de projets simultanés à 5 maximum",
         "Surveiller les employés avec >240 heures/mois"),

        ("Programme de Reconnaissance",
         "Créer un système de promotion basé sur la performance",
         "Identifier et récompenser les high performers (éval >0.8)"),

        ("Équilibre Vie-Travail",
         "Implémenter des politiques de travail flexible",
         "Monitoring régulier de la satisfaction"),

        ("Rétention des Talents",
         "Focus particulier sur employés avec 4-6 ans d'ancienneté",
         "Entretiens individuels trimestriels")
    ]

    for i, (category, action1, action2) in enumerate(recommendations, 1):
        print(f"\n   {i}. {category}")
        print(f"      → {action1}")
        print(f"      → {action2}")

    print("\n3. IMPACT BUSINESS ESTIMÉ")
    print("-" * 70)
    current_turnover = df['left'].mean()
    potential_reduction = 0.30  # 30% reduction estimée
    new_turnover = current_turnover * (1 - potential_reduction)

    print(f"   • Turnover actuel: {current_turnover:.1%}")
    print(f"   • Turnover cible: {new_turnover:.1%}")
    print(f"   • Réduction estimée: {current_turnover - new_turnover:.1%}")
    print(f"   • Employés retenus (sur 15k): {int((current_turnover - new_turnover) * 15000)}")

    print("=" * 70)
```

### 8. Export Professionnel des Résultats

```python
def export_analysis_results(model, X_test, y_test, feature_importance):
    """
    Exporter les résultats dans un format professionnel.
    """
    from datetime import datetime

    # Créer un rapport PDF (nécessite reportlab)
    # Ou exporter en Excel pour le partage

    results = {
        'date': datetime.now().strftime('%Y-%m-%d'),
        'model_type': 'Logistic Regression',
        'accuracy': accuracy_score(y_test, model.predict(X_test)),
        'roc_auc': roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]),
        'top_features': feature_importance.head(10).to_dict('records')
    }

    # Sauvegarder en JSON
    import json
    with open('salifort_analysis_results.json', 'w') as f:
        json.dump(results, f, indent=4)

    print("✓ Résultats exportés dans 'salifort_analysis_results.json'")

    return results
```

## 🎯 Checklist Finale pour un Notebook Professionnel

- [ ] En-tête avec informations complètes
- [ ] Table des matières avec liens markdown
- [ ] Palette de couleurs cohérente
- [ ] Graphiques avec titres, labels et annotations
- [ ] Tests statistiques documentés
- [ ] Feature engineering justifié
- [ ] Cross-validation implémentée
- [ ] Métriques multiples (Accuracy, Precision, Recall, ROC-AUC)
- [ ] Visualisations des résultats
- [ ] Interprétation business de chaque résultat
- [ ] Recommandations actionnables
- [ ] Conclusion avec prochaines étapes
- [ ] Code propre et commenté
- [ ] Markdown cells pour expliquer la logique

## 📚 Ressources Additionnelles

- Seaborn Gallery: https://seaborn.pydata.org/examples/index.html
- Scikit-learn Metrics: https://scikit-learn.org/stable/modules/model_evaluation.html
- Pandas Styling: https://pandas.pydata.org/docs/user_guide/style.html

---

**Note**: Utilisez ces suggestions pour améliorer progressivement votre notebook.
Commencez par les visualisations, puis ajoutez les tests statistiques et
l'optimisation du modèle.

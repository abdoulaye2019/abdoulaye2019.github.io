"""
Salifort Motors HR Analytics - Advanced Model Optimization
Author: Abdoulaye Leye
Description: Advanced regression model with hyperparameter tuning and ensemble methods
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (classification_report, confusion_matrix,
                             roc_auc_score, roc_curve, precision_recall_curve)
import warnings
warnings.filterwarnings('ignore')

# Set style for professional visualizations
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

class SalifortHRAnalytics:
    """
    Advanced HR Analytics Model for Employee Turnover Prediction
    """

    def __init__(self, data_path):
        """Initialize with dataset path"""
        self.df = pd.read_csv(data_path)
        self.df_clean = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.models = {}
        self.results = {}

    def preprocess_data(self):
        """Clean and preprocess the dataset"""
        print("="*60)
        print("DATA PREPROCESSING")
        print("="*60)

        # Rename columns
        self.df = self.df.rename(columns={
            'average_montly_hours': 'average_monthly_hours',
            'Work_accident': 'work_accident',
            'Department': 'department'
        })

        print(f"Original shape: {self.df.shape}")
        print(f"Duplicates found: {self.df.duplicated().sum()}")

        # Remove duplicates
        self.df_clean = self.df.drop_duplicates()
        print(f"Shape after removing duplicates: {self.df_clean.shape}")

        # Feature engineering
        self.df_clean['satisfaction_squared'] = self.df_clean['satisfaction_level'] ** 2
        self.df_clean['hours_per_project'] = (self.df_clean['average_monthly_hours'] /
                                               self.df_clean['number_project'])
        self.df_clean['overworked'] = (self.df_clean['average_monthly_hours'] > 240).astype(int)
        self.df_clean['underworked'] = (self.df_clean['average_monthly_hours'] < 160).astype(int)

        print("\nFeature engineering completed:")
        print("  - satisfaction_squared: Capture non-linear satisfaction effects")
        print("  - hours_per_project: Work intensity metric")
        print("  - overworked/underworked: Workload category flags")

        return self.df_clean

    def prepare_features(self):
        """Prepare features for modeling"""
        print("\n" + "="*60)
        print("FEATURE PREPARATION")
        print("="*60)

        # Encode categorical variables
        df_encoded = pd.get_dummies(self.df_clean,
                                     columns=['department', 'salary'],
                                     drop_first=True)

        # Separate features and target
        X = df_encoded.drop('left', axis=1)
        y = df_encoded['left']

        # Train-test split with stratification
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )

        # Scale features
        scaler = StandardScaler()
        self.X_train = pd.DataFrame(
            scaler.fit_transform(self.X_train),
            columns=self.X_train.columns
        )
        self.X_test = pd.DataFrame(
            scaler.transform(self.X_test),
            columns=self.X_test.columns
        )

        print(f"Training set: {self.X_train.shape}")
        print(f"Test set: {self.X_test.shape}")
        print(f"Class distribution in training: {self.y_train.value_counts().to_dict()}")

    def train_logistic_regression(self):
        """Train optimized Logistic Regression with GridSearch"""
        print("\n" + "="*60)
        print("TRAINING: Logistic Regression with GridSearchCV")
        print("="*60)

        param_grid = {
            'C': [0.001, 0.01, 0.1, 1, 10],
            'penalty': ['l1', 'l2'],
            'solver': ['liblinear', 'saga'],
            'class_weight': ['balanced', None],
            'max_iter': [1000]
        }

        lr = LogisticRegression(random_state=42)
        grid_search = GridSearchCV(lr, param_grid, cv=5, scoring='recall',
                                   n_jobs=-1, verbose=1)
        grid_search.fit(self.X_train, self.y_train)

        self.models['logistic_regression'] = grid_search.best_estimator_

        print(f"\nBest parameters: {grid_search.best_params_}")
        print(f"Best cross-validation recall: {grid_search.best_score_:.4f}")

        return grid_search.best_estimator_

    def train_random_forest(self):
        """Train Random Forest with GridSearch"""
        print("\n" + "="*60)
        print("TRAINING: Random Forest with GridSearchCV")
        print("="*60)

        param_grid = {
            'n_estimators': [100, 200],
            'max_depth': [10, 20, None],
            'min_samples_split': [2, 5],
            'min_samples_leaf': [1, 2],
            'class_weight': ['balanced', None]
        }

        rf = RandomForestClassifier(random_state=42)
        grid_search = GridSearchCV(rf, param_grid, cv=5, scoring='recall',
                                   n_jobs=-1, verbose=1)
        grid_search.fit(self.X_train, self.y_train)

        self.models['random_forest'] = grid_search.best_estimator_

        print(f"\nBest parameters: {grid_search.best_params_}")
        print(f"Best cross-validation recall: {grid_search.best_score_:.4f}")

        return grid_search.best_estimator_

    def train_gradient_boosting(self):
        """Train Gradient Boosting with GridSearch"""
        print("\n" + "="*60)
        print("TRAINING: Gradient Boosting with GridSearchCV")
        print("="*60)

        param_grid = {
            'n_estimators': [100, 200],
            'learning_rate': [0.01, 0.1, 0.2],
            'max_depth': [3, 5, 7],
            'min_samples_split': [2, 5]
        }

        gb = GradientBoostingClassifier(random_state=42)
        grid_search = GridSearchCV(gb, param_grid, cv=5, scoring='recall',
                                   n_jobs=-1, verbose=1)
        grid_search.fit(self.X_train, self.y_train)

        self.models['gradient_boosting'] = grid_search.best_estimator_

        print(f"\nBest parameters: {grid_search.best_params_}")
        print(f"Best cross-validation recall: {grid_search.best_score_:.4f}")

        return grid_search.best_estimator_

    def evaluate_model(self, model_name):
        """Evaluate model performance"""
        model = self.models[model_name]
        y_pred = model.predict(self.X_test)
        y_pred_proba = model.predict_proba(self.X_test)[:, 1]

        # Store results
        self.results[model_name] = {
            'y_pred': y_pred,
            'y_pred_proba': y_pred_proba,
            'classification_report': classification_report(self.y_test, y_pred),
            'confusion_matrix': confusion_matrix(self.y_test, y_pred),
            'roc_auc': roc_auc_score(self.y_test, y_pred_proba)
        }

        print(f"\n" + "="*60)
        print(f"EVALUATION: {model_name.upper()}")
        print("="*60)
        print("\nClassification Report:")
        print(self.results[model_name]['classification_report'])
        print(f"\nROC-AUC Score: {self.results[model_name]['roc_auc']:.4f}")

    def plot_feature_importance(self, model_name, top_n=15):
        """Plot feature importance for tree-based models"""
        if model_name not in ['random_forest', 'gradient_boosting']:
            print(f"Feature importance not available for {model_name}")
            return

        model = self.models[model_name]
        importance_df = pd.DataFrame({
            'feature': self.X_train.columns,
            'importance': model.feature_importances_
        }).sort_values('importance', ascending=False).head(top_n)

        plt.figure(figsize=(12, 8))
        sns.barplot(data=importance_df, x='importance', y='feature', palette='viridis')
        plt.title(f'Top {top_n} Feature Importances - {model_name.replace("_", " ").title()}',
                  fontsize=16, fontweight='bold')
        plt.xlabel('Importance Score', fontsize=12)
        plt.ylabel('Features', fontsize=12)
        plt.tight_layout()
        plt.savefig(f'{model_name}_feature_importance.png', dpi=300, bbox_inches='tight')
        plt.show()

    def plot_roc_curves(self):
        """Plot ROC curves for all models"""
        plt.figure(figsize=(10, 8))

        for model_name in self.models.keys():
            y_pred_proba = self.results[model_name]['y_pred_proba']
            fpr, tpr, _ = roc_curve(self.y_test, y_pred_proba)
            auc_score = self.results[model_name]['roc_auc']

            plt.plot(fpr, tpr, linewidth=2,
                    label=f'{model_name.replace("_", " ").title()} (AUC = {auc_score:.3f})')

        plt.plot([0, 1], [0, 1], 'k--', linewidth=2, label='Random Classifier')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate', fontsize=12)
        plt.ylabel('True Positive Rate (Recall)', fontsize=12)
        plt.title('ROC Curves - Model Comparison', fontsize=16, fontweight='bold')
        plt.legend(loc='lower right', fontsize=10)
        plt.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig('roc_curves_comparison.png', dpi=300, bbox_inches='tight')
        plt.show()

    def plot_confusion_matrices(self):
        """Plot confusion matrices for all models"""
        n_models = len(self.models)
        fig, axes = plt.subplots(1, n_models, figsize=(6*n_models, 5))

        if n_models == 1:
            axes = [axes]

        for idx, model_name in enumerate(self.models.keys()):
            cm = self.results[model_name]['confusion_matrix']
            sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', ax=axes[idx],
                       cbar=True, square=True)
            axes[idx].set_title(f'{model_name.replace("_", " ").title()}',
                               fontsize=14, fontweight='bold')
            axes[idx].set_ylabel('True Label', fontsize=11)
            axes[idx].set_xlabel('Predicted Label', fontsize=11)
            axes[idx].set_xticklabels(['Stayed', 'Left'])
            axes[idx].set_yticklabels(['Stayed', 'Left'])

        plt.tight_layout()
        plt.savefig('confusion_matrices_comparison.png', dpi=300, bbox_inches='tight')
        plt.show()

    def generate_summary_report(self):
        """Generate comprehensive summary report"""
        print("\n" + "="*60)
        print("MODEL COMPARISON SUMMARY")
        print("="*60)

        summary_data = []
        for model_name in self.models.keys():
            cm = self.results[model_name]['confusion_matrix']
            tn, fp, fn, tp = cm.ravel()

            precision = tp / (tp + fp) if (tp + fp) > 0 else 0
            recall = tp / (tp + fn) if (tp + fn) > 0 else 0
            f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
            accuracy = (tp + tn) / (tp + tn + fp + fn)

            summary_data.append({
                'Model': model_name.replace('_', ' ').title(),
                'Accuracy': f"{accuracy:.3f}",
                'Precision': f"{precision:.3f}",
                'Recall': f"{recall:.3f}",
                'F1-Score': f"{f1:.3f}",
                'ROC-AUC': f"{self.results[model_name]['roc_auc']:.3f}"
            })

        summary_df = pd.DataFrame(summary_data)
        print("\n", summary_df.to_string(index=False))

        # Save to CSV
        summary_df.to_csv('model_comparison_summary.csv', index=False)
        print("\n✓ Summary saved to 'model_comparison_summary.csv'")

        return summary_df


if __name__ == "__main__":
    print("="*60)
    print("SALIFORT MOTORS HR ANALYTICS - ADVANCED MODEL OPTIMIZATION")
    print("Author: Abdoulaye Leye")
    print("="*60)

    # Initialize analyzer
    analyzer = SalifortHRAnalytics('HR_capstone_dataset.csv')

    # Preprocess data
    analyzer.preprocess_data()
    analyzer.prepare_features()

    # Train models
    analyzer.train_logistic_regression()
    analyzer.train_random_forest()
    analyzer.train_gradient_boosting()

    # Evaluate all models
    for model_name in analyzer.models.keys():
        analyzer.evaluate_model(model_name)

    # Generate visualizations
    print("\n" + "="*60)
    print("GENERATING VISUALIZATIONS")
    print("="*60)

    analyzer.plot_feature_importance('random_forest')
    analyzer.plot_feature_importance('gradient_boosting')
    analyzer.plot_roc_curves()
    analyzer.plot_confusion_matrices()

    # Generate summary
    summary = analyzer.generate_summary_report()

    print("\n" + "="*60)
    print("ANALYSIS COMPLETE!")
    print("="*60)
    print("\nAll results and visualizations have been saved.")

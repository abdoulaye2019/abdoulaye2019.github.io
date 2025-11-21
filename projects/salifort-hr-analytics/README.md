# Salifort Motors HR Analytics - Employee Turnover Prediction

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/abdoulaye2019/abdoulaye2019.github.io/blob/main/projects/salifort-hr-analytics/Activity_%20Course%207%20Salifort%20Motors%20project%20lab.ipynb)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/abdoulaye2019/abdoulaye2019.github.io/main?filepath=projects/salifort-hr-analytics/Activity_%20Course%207%20Salifort%20Motors%20project%20lab.ipynb)
[![View on GitHub](https://img.shields.io/badge/View%20on-GitHub-181717?style=flat&logo=github)](https://github.com/abdoulaye2019/abdoulaye2019.github.io/blob/main/projects/salifort-hr-analytics/Activity_%20Course%207%20Salifort%20Motors%20project%20lab.ipynb)

**Author:** Abdoulaye Leye
**Project Type:** Capstone Project - Google Data Analytics Advanced Certificate
**Date:** November 2025

## Project Overview

This project analyzes employee turnover at Salifort Motors using advanced machine learning techniques. The goal is to predict which employees are likely to leave the company and provide actionable insights for HR decision-making.

### Key Achievements

- **96.7% Recall Rate**: Successfully identifies 385 out of 398 employees who will leave
- **0.851 ROC-AUC Score**: Excellent model discrimination capability
- **$15.5M Potential Savings**: Estimated annual cost avoidance through proactive retention
- **Multiple Models Compared**: Logistic Regression, Random Forest, and Gradient Boosting

## Dataset

- **Source**: Salifort Motors HR Department
- **Records**: 14,999 employees (11,991 after removing duplicates)
- **Features**: 10 variables including satisfaction level, evaluation scores, project count, hours worked, tenure, accidents, promotions, department, and salary
- **Target**: Employee departure (left = 1, stayed = 0)
- **Class Distribution**: 76.19% stayed, 23.81% left

## Methodology

### 1. Data Preprocessing
- Removed 3,008 duplicate records
- Standardized column naming conventions
- Created engineered features:
  - `satisfaction_squared`: Non-linear satisfaction effects
  - `hours_per_project`: Work intensity metric
  - `overworked/underworked`: Workload category flags

### 2. Feature Engineering
- One-hot encoding for categorical variables (department, salary)
- StandardScaler normalization for numerical features
- Train-test split (80/20) with stratification

### 3. Model Development
- **Logistic Regression** with GridSearchCV optimization
- **Random Forest** with hyperparameter tuning
- **Gradient Boosting** with learning rate optimization
- 5-fold cross-validation for all models

### 4. Model Evaluation
- Classification metrics (Precision, Recall, F1-Score, Accuracy)
- ROC-AUC curves for model comparison
- Confusion matrices for error analysis
- Feature importance analysis for tree-based models

## Key Findings

### Critical Predictive Factors

1. **Promotions** reduce turnover risk by **73%** (strongest retention lever)
2. **Work accidents** paradoxically reduce risk by **74%** (requires investigation)
3. **Employee satisfaction** reduces risk by **66%**
4. **4-5 years tenure** increases risk by **143%** (critical intervention window)

### Employee Turnover Patterns

- **Dissatisfied & Overworked**: Low satisfaction + high hours → high turnover
- **High Performers**: High satisfaction + high evaluation → may leave for better opportunities
- **Senior Employees**: 6-10 years tenure shows different turnover dynamics

## Business Recommendations

### Immediate Actions (0-3 months)
1. Implement 4-year career milestone reviews
2. Audit promotion frequency and acceleration opportunities
3. Investigate post-accident support programs
4. Deploy monthly risk scoring system

### Strategic Initiatives (3-12 months)
1. Create dual retention strategies for different employee segments
2. Optimize project allocation to avoid extremes (2 or 7+ projects)
3. Integrate model outputs into performance management cycles
4. Train managers on interpreting employee risk scores

## Files in This Project

- `Activity_ Course 7 Salifort Motors project lab.ipynb`: Main analysis notebook
- `model_optimization.py`: Advanced model optimization script
- `HR_capstone_dataset.csv`: Dataset
- `README.md`: This file

## Technical Stack

- **Python 3.11**
- **pandas**: Data manipulation
- **numpy**: Numerical computations
- **scikit-learn**: Machine learning models
- **matplotlib & seaborn**: Data visualization
- **Jupyter Notebook**: Interactive analysis

## How to Run

### Requirements
```bash
pip install pandas numpy scikit-learn matplotlib seaborn jupyter
```

### Execute Analysis
```bash
# Run optimization script
python model_optimization.py

# Or launch Jupyter Notebook
jupyter notebook "Activity_ Course 7 Salifort Motors project lab.ipynb"
```

## Model Performance Comparison

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
|-------|----------|-----------|--------|----------|---------|
| Logistic Regression | 75.9% | 39.8% | 87.9% | 54.8% | 0.872 |
| Random Forest | **98.6%** | **98.9%** | 92.7% | **95.7%** | 0.978 |
| **Gradient Boosting (Recommended)** | **98.1%** | **95.1%** | **93.2%** | **94.2%** | **0.981** |

### Winner: Gradient Boosting
- **Best ROC-AUC**: 0.981 (98.1% discrimination capability)
- **Balanced Performance**: 95.1% precision + 93.2% recall
- **Business Impact**: Prevents 371 out of 398 departures = **$18.5M annual savings**

## Ethical Considerations

- **Privacy**: Individual risk scores remain confidential to HR only
- **Transparency**: Employees aware of retention analytics usage
- **Bias Prevention**: Regular monitoring across departments and demographics
- **Supportive Use**: Predictions drive career development, not penalties

## Future Enhancements

1. Ensemble methods for improved precision
2. Department-specific models
3. Temporal features (time since last promotion)
4. Survival analysis for departure timeline prediction
5. Regular model retraining as organizational dynamics evolve

## Contact

**Abdoulaye Leye**
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [abdoulaye2019](https://github.com/abdoulaye2019)
- Portfolio: [abdoulaye2019.github.io](https://abdoulaye2019.github.io)

## License

This project is part of the Google Data Analytics Advanced Certificate program.

---

*Last Updated: November 21, 2025*

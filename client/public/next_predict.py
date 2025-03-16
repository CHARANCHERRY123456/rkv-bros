# Import necessary libraries
import pandas as pd
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder

# Load data from the CSV file
data = pd.read_csv("r20.csv")

# Display the first few rows to check data structure
print(data.head())

# Feature selection: Use previous semesters and additional features that may influence the prediction
# Ensure column names match your CSV file exactly
features = ['E1SEM1', 'E1SEM2', 'E2SEM1', 'E2SEM2', 'CGPA', 'BRANCH']  # Add more relevant columns if needed
target_column = 'E3SEM1'  # Target column we are trying to predict

# Check for missing values and clean data accordingly
data = data.dropna(subset=features)  # Drop rows with NaN in feature columns

# Encode categorical features if necessary, for example, 'BRANCH'
if 'BRANCH' in data.columns:
    label_encoder = LabelEncoder()
    data['BRANCH'] = label_encoder.fit_transform(data['BRANCH'])

# Separate features (X) and target (y)
X = data[features]
y = data[target_column] if target_column in data.columns else None

# Split data into training and test sets if `E3SEM1` exists
if y is not None:
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Initialize and train the Decision Tree Regressor
    model = DecisionTreeRegressor(random_state=42)
    model.fit(X_train, y_train)

    # Predict and evaluate model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Mean Absolute Error: {mae}")
else:
    # If no `E3SEM1` values are available, train on all available data and predict for a new input
    model = DecisionTreeRegressor(random_state=42)
    model.fit(X, data[features])

# Function to predict E3SEM1 based on ID
def predict_next_semester_marks(student_id):
    student_data = data[data['ID'] == student_id][features]
    if student_data.empty:
        print(f"No data found for student ID {student_id}")
        return None
    predicted_marks = model.predict(student_data)[0]
    print(f"Predicted E3SEM1 marks for student ID {student_id}: {predicted_marks}")
    return predicted_marks

# Example prediction
student_id = 'R200589'  # Replace with the actual student ID
predict_next_semester_marks(student_id)

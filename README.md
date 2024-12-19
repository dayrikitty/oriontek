# Oriontek
Code challenge for OrionTek

## **Prerequisites**

### **Backend Prerrequisites**
- Python 3.13 or higher
- pip (Python package manager)

### **Frontend Requirements**
- Node.js (22.x or higher)
- npm or yarn (package manager for Node.js)

** This guide was based on a mac setup.

---

## **Backend Setup (Django)**

1. **Set Up a Virtual Environment**:
It is recommended to have a virtual environment to run python projects :) 

   ```bash
   python -m venv venv
   source venv/bin/activate 
   ```

2. **Install Python Dependencies**:
   ```bash
   pip install django djangorestframework djangorestframework-simplejwt django-cors-headers
   ```

3. **Apply Migrations**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Create a Superuser**:
   ```bash
   python manage.py createsuperuser
   ```
   Follow the prompts to create a superuser account. You will need it to login the application.

5. **Run the Development Server**:
   ```bash
   python manage.py runserver
   ```
   The backend will be accessible at: `http://127.0.0.1:8000`

---

## **Frontend Setup (React)**

1. **Navigate to the Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Node.js Dependencies**:
   If using yarn (prefered):
   ```bash
   yarn install
   ```
   Or if using npm:
   ```bash
   npm install
   ```

3. **Start the React Development Server**:
   If using yarn:
   ```bash
   yarn dev
   ```
   Or if using npm:
   ```bash
   npm run dev 
   ```

   The frontend will be accessible at: `http://localhost:5173`

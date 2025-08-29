<div align="center">

  <h1 align="center">🚀 TrackIt - Your Smart Expense Tracker</h1>
  
  <p align="center">
    Stop wondering where your money went. Start <b>knowing</b> with TrackIt!
    <br />
    A full-stack MERN application with a Python AI microservice to seamlessly track, manage, and analyze your personal finances.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Badge">
  </p>

</div>

---

## ✨ What's Inside?

TrackIt is not just another boring spreadsheet. It's a powerful, intelligent tool designed to make financial management intuitive and even a little fun.

**[➡️ View the Live Demo Here!](trackit-expense.vercel.app)** <div align="center">
  
</div>


## Core Features

* **🔐 Secure User Authentication:** Full registration and login flow using JWTs, with secure password hashing (`bcrypt`) and protected API routes.
* **👤 Complete Profile Management:** Users can update their personal details (name, phone) and change their password.
* **🖼️ Cloud-Based Image Uploads:** A modern drag-and-drop interface for uploading profile pictures, hosted on Cloudinary.
* **💸 Full CRUD for Expenses:** Seamlessly **C**reate, **R**ead, **U**pdate, and **D**elete expenses.
* **📊 Dynamic Dashboard & Analytics:** Get an instant overview of your finances with a summary of total spending and a dynamic pie chart breaking down expenses by category.
* **🤖 AI-Powered Category Suggestions:** A Python/Flask microservice uses a Machine Learning model (`scikit-learn`) to intelligently suggest an expense category as you type the title.
* **💰 Smart Budgeting:** Set monthly budgets for different categories and track your spending with real-time progress bars.
* **🔍 Advanced Filtering & Pagination:** Easily find what you're looking for with filters for date ranges and categories, with a paginated list that can handle hundreds of entries.
* **🎨 Modern & Responsive UI:** A sleek, dark-themed, and fully responsive user interface built with React, ensuring a great experience on any device.
* **🚀 Professional Notifications:** A stylish notification system (`react-toastify`) provides smooth feedback for all user actions.

---

## 🛠️ Tech Stack

| Area | Technologies |
| :--- | :--- |
| **Frontend** | ![React](https://img.shields.io/badge/-React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white) ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat&logo=react-router&logoColor=white) |
| **Backend API** | ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat&logo=express&logoColor=white) |
| **AI Service** | ![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/-Flask-000000?style=flat&logo=flask&logoColor=white) ![scikit-learn](https://img.shields.io/badge/-scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white) |
| **Database** | ![MongoDB](https://img.shields.io/badge/-MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) |
| **Image Storage** | ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need `Node.js`, `npm`, and `Python` installed on your machine.

### Local Setup

1.  **Clone the repo:**
    ```sh
    git clone [https://github.com/your-username/TrackIt.git](https://github.com/your-username/TrackIt.git)
    cd TrackIt
    ```

2.  **Setup the Backend API:**
    ```sh
    cd server
    npm install
    # Create your .env file here (see below)
    npm run dev
    ```

3.  **Setup the AI Service:** (Open a second terminal)
    ```sh
    cd ai-service
    pip install -r requirements.txt
    python app.py
    ```

4.  **Setup the Frontend:** (Open a third terminal)
    ```sh
    cd client
    npm install
    npm run dev
    ```
The app will be running on `http://localhost:5173`.

### Environment Variables

You'll need to create a `.env` file in the `server/` directory with the following variables:
```
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_super_long_and_random_jwt_secret

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

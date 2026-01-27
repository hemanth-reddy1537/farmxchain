# 🌾 FarmChainX - AI-Driven Agricultural Traceability Network

![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-SpringBoot-brightgreen)
![Database](https://img.shields.io/badge/Database-MySQL-orange)

FarmChainX is a full-stack platform for **tracking agricultural produce** with AI-based tools. It enables farmers, distributors, and consumers to monitor the journey of agricultural products, ensuring **transparency and traceability** in the supply chain.

---

## 📂 Project Structure

FarmChainX-AI-Driven-Agricultural-Traceability-Network/
│
├─ frontend/ # React frontend
└─ backend/ # Spring Boot backend (Eclipse project)

<<<<<<< HEAD
=======
yaml
Copy code

>>>>>>> 8c690be (Updated UI)
---

## ⚙️ Tech Stack

- **Frontend:** React.js, JavaScript, HTML, CSS  
- **Backend:** Java, Spring Boot, Maven  
- **Database:** MySQL  
- **Tools:** Eclipse IDE, Node.js, npm, Git  

---

## 🚀 Getting Started

### Frontend (React)

1. Open a terminal in the project root and go to the `frontend` folder:

```bash
cd frontend
# install dependencies
npm install
# start the development server
npm start
```

2. Environment variables (frontend)

Create a `.env` file in the project root (the repo already provides `.env.example`). Copy the example and add your API key:

```
REACT_APP_API_KEY=your_gemini_api_key_here
```

Restart the dev server after changing env vars. The frontend reads `process.env.REACT_APP_API_KEY` in `src/api/geminiApi.js`.

Open http://localhost:3000 in your browser.

Backend (Spring Boot / Eclipse)
Open Eclipse IDE and import the backend folder as an existing Maven project.

Configure MySQL database in application.properties:

properties

spring.datasource.url=jdbc:mysql://localhost:3306/farmxchain
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
Create the database:

CREATE DATABASE farmxchain;
Run FarmxchainAuthApplication.java as a Java Application. The backend will start on http://localhost:8080.

🔄 Running the Full Application
Start MySQL.

Run the backend in Eclipse.

Run the frontend (npm start).

Access the app at http://localhost:3000.
The frontend communicates with backend APIs at http://localhost:8080.



💡 Notes
Ensure ports 3000 (frontend) and 8080 (backend) are free.

<<<<<<< HEAD
The backend must be running for the frontend features to work properly.
=======
The backend must be running for the frontend features to work properly.
>>>>>>> 8c690be (Updated UI)

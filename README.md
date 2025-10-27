🧠 ResumeAI Generator

An intelligent AI-powered Resume Generator that creates professional resumes using your details — built with React, Node.js, Express, MongoDB, and Groq’s Llama model.


---

🚀 Features

📝 Generate AI-based professional resumes

🔐 JWT Authentication for secure user access

💾 Save generated resumes to MongoDB

📄 Download generated resumes as PDF

⚡ Built using the Groq API (Llama 3.1 model)

🎨 Simple and clean UI built with React + Vite



---

🧩 Tech Stack

Layer	Technologies

Frontend	React, Axios, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB + Mongoose
AI Model	Groq API (Llama 3.1-8b-instant)
Auth	JWT (JSON Web Token)



---

📁 Folder Structure

ResumeAI-Generator/
│
├── backend/
│   ├── models/
│   │   └── Resume.js
│   ├── routes/
│   │   └── resumeRoute.js
│   ├── server.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── sections/
│   │   │   └── ResumeGenerator.jsx
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env.example
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── .gitignore
├── README.md
└── LICENSE


---

⚙ Setup Instructions

1️⃣ Clone the Repository

git clone https://github.com/<your-username>/<your-repo-name>.git
cd ResumeAI-Generator


---

2️⃣ Backend Setup

cd backend
npm install

Create your .env file from the example:

cp .env.example .env

Then open .env and fill your values:

PORT=5001
MONGO_URI=your_mongodb_connection
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret_key

Start backend:

npm start


---

3️⃣ Frontend Setup

cd ../frontend
npm install

Create your .env file:

cp .env.example .env

Then update:

VITE_API_URL=http://localhost:5001/api

Start frontend:

npm run dev


---

4️⃣ Open App

Visit 👉 http://localhost:5173
Backend runs on 👉 http://localhost:5001


---

🔑 Environment Variables

Variable	Description

PORT	Server port (default 5001)
MONGO_URI	MongoDB connection string
GROQ_API_KEY	Your Groq API key
JWT_SECRET	Secret for JWT
VITE_API_URL	Frontend environment variable (API URL)



---

🧠 Example Prompt (sent to Groq API)

You are a professional resume writer.
Generate a clean, well-formatted resume based on the following:
Name: John Doe
Email: john@example.com
Education: B.Tech in Computer Science
Experience: 2 years in frontend development
Skills: React, Node.js, Express, MongoDB
Achievements: Created 5+ live projects
Certificates: AWS Certified Developer
---

🛠 Common Errors & Fixes

Error	Cause	Fix

401 Unauthorized	Invalid or missing JWT token	Check login token in frontend
400 Bad Request	Missing input fields	Ensure all fields are filled
model_decommissioned	Outdated Groq model	Use "llama-3.1-8b-instant"
MongoNetworkError	Wrong MongoDB URI	Verify .env MONGO_URI value



---

🧑‍💻 Author

Omkar Pawar
📧 pawaromkar030@gmail.com


---

🪪 License

This project is licensed under the MIT License — feel free to use and modify.


---

Would you like me to include screenshots placeholders (UI + Postman test examples) inside the README (in Markdown format)?
It’ll make your GitHub page look more professional.

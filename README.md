WonderLust is a production-ready, Airbnb-inspired accommodation booking web application built using Node.js, Express, MongoDB Atlas, EJS, Passport, and Cloudinary.

This project demonstrates real-world full-stack architecture including authentication, session management, image uploads, MVC structure, and cloud database integration.
🚀 Live Project:https://wonderlust-rfqs.onrender.com
💻 Developed by: Abhishek kumar Pandey (A.K)
✨ Features

🔐 User Authentication (Signup/Login/Logout)
🏠 Create, Edit, Delete Listings
🖼 Image Uploads with Cloudinary
🧭 Map Integration for location display
💬 Flash messages & session handling
🧩 MVC Project Structure
🌐 MongoDB Atlas Cloud Database
🎨 EJS Templating with Responsive UI
🔒 Secure Environment Variables with dotenv
🚀 Ready for Deployment (Render)

🛠 Tech Stack
Technology	Usage
Node.js	Backend runtime
Express.js	Server framework
MongoDB Atlas	Cloud database
Mongoose	ODM for MongoDB
EJS	Templating engine
Passport.js	Authentication
Cloudinary	Image storage
Express Session	Session management
Connect Flash	Notifications

📁 Project Structure
backend/
│
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── utils/
├── app.js
├── cloudConfig.js
└── package.json

⚙️ Environment Variables
Create a .env file in root:
ATLASDB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_KEY=xxxx
CLOUDINARY_SECRET=xxxx
SESSION_SECRET=your_secret


⚠️ .env is ignored from Git for security.
▶️ Run Locally
npm install
nodemon app.js


Visit:
http://localhost:8080

🚀 Deployment (Render)
This project is configured to be easily deployed on Render.
Steps:
Push repo to GitHub
Create Web Service on Render
Add environment variables
Deploy

🧠 What This Project Demonstrates
Real-world full stack development
Secure authentication flow
Cloud image management
MVC architecture
Production deployment readiness
Handling real networking, DNS, and Atlas connectivity issues

📌 Future Improvements
Reviews & Ratings system
Search & Filters
Booking functionality
Admin dashboard
UI/UX enhancements

📜 License
This project is for educational and portfolio purposes.

⭐ If you like this project, consider starring the repo!


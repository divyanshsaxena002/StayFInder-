# StayFinder - Airbnb Clone

A full-stack Airbnb-like application built with React.js frontend and Node.js backend.

## 🚀 Deployment Guide

### Quick Deploy to Vercel

#### 1. Frontend Deployment
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your GitHub repository
4. Set the root directory to `stayfinder-frontend`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.vercel.app`
6. Deploy!

#### 2. Backend Deployment
1. In Vercel, create another project for the backend
2. Set the root directory to `stayfinder-backend`
3. Add environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string for JWT tokens
   - `FRONTEND_URL`: Your frontend Vercel URL
4. Deploy!

#### 3. Database Setup (MongoDB Atlas)
1. Go to [mongodb.com](https://mongodb.com) and create a free account
2. Create a new cluster
3. Get your connection string and add it to backend environment variables

### Alternative Deployment Options

#### Netlify + Railway
- **Frontend**: Deploy to Netlify
- **Backend**: Deploy to Railway
- **Database**: Use Railway's MongoDB integration

#### Render (All-in-one)
- Deploy both frontend and backend to Render
- Use Render's MongoDB service

## 🛠️ Local Development

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   cd stayfinder-backend && npm install
   cd ../stayfinder-frontend && npm install
   ```
3. Set up environment variables (see `env.example` files)
4. Start the backend: `cd stayfinder-backend && npm run dev`
5. Start the frontend: `cd stayfinder-frontend && npm start`

## 📁 Project Structure
```
AIRBNB/
├── stayfinder-backend/     # Node.js/Express API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
└── stayfinder-frontend/   # React.js frontend
    ├── components/        # React components
    ├── pages/            # Page components
    └── src/              # Source files
```

## 🔧 Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Server port (default: 5000)
- `FRONTEND_URL`: Frontend URL for CORS

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## 📝 Features
- User authentication (signup/login)
- Property listings
- Booking system
- User dashboard
- Host functionality
- Responsive design

## 🚀 Live Demo
[Add your deployed URL here once live]

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.


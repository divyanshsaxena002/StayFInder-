# 🚀 StayFinder Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Code
1. Make sure all your code is committed to GitHub
2. Your project structure should look like this:
   ```
   AIRBNB/
   ├── stayfinder-backend/
   └── stayfinder-frontend/
   ```

### Step 2: Set Up MongoDB Atlas (Database)
1. Go to [mongodb.com](https://mongodb.com) and create a free account
2. Create a new cluster (free tier is fine)
3. Click "Connect" and choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `stayfinder`

### Step 3: Deploy Backend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Node.js
   - **Root Directory**: `stayfinder-backend`
   - **Build Command**: Leave empty (not needed for Node.js)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random string (e.g., `mysecretkey123`)
   - `FRONTEND_URL`: Leave empty for now (we'll add it after frontend deployment)
6. Click "Deploy"
7. Copy the deployment URL (e.g., `https://your-backend.vercel.app`)

### Step 4: Deploy Frontend to Vercel
1. In Vercel, click "New Project" again
2. Import the same GitHub repository
3. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `stayfinder-frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - `REACT_APP_API_URL`: Your backend URL from Step 3
5. Click "Deploy"
6. Copy the frontend URL (e.g., `https://your-frontend.vercel.app`)

### Step 5: Update Backend CORS
1. Go back to your backend project in Vercel
2. Add/Update Environment Variable:
   - `FRONTEND_URL`: Your frontend URL from Step 4
3. Redeploy the backend

### Step 6: Test Your Application
1. Visit your frontend URL
2. Try to sign up/login
3. Test the booking functionality
4. Check if everything works correctly

## Alternative Deployment Options

### Option 2: Netlify + Railway
- **Frontend**: Deploy to Netlify (similar to Vercel)
- **Backend**: Deploy to Railway (great for Node.js APIs)
- **Database**: Use Railway's MongoDB integration

### Option 3: Render (All-in-one)
1. Go to [render.com](https://render.com)
2. Create two services:
   - **Web Service** for backend
   - **Static Site** for frontend
3. Use Render's MongoDB service

## Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/stayfinder
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.vercel.app
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure `FRONTEND_URL` is set correctly in backend
2. **API Not Found**: Check if `REACT_APP_API_URL` is set correctly in frontend
3. **Database Connection**: Verify your MongoDB Atlas connection string
4. **Build Failures**: Check if all dependencies are in package.json

### Debug Steps:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Test API endpoints directly using Postman or similar tool
4. Check browser console for frontend errors

## Post-Deployment

### Custom Domain (Optional)
1. In Vercel, go to your project settings
2. Add your custom domain
3. Update environment variables with new URLs

### Monitoring
1. Set up Vercel Analytics
2. Monitor your MongoDB Atlas dashboard
3. Set up error tracking (Sentry, etc.)

## Support
If you encounter issues:
1. Check the deployment logs in Vercel
2. Verify all environment variables are set
3. Test locally first to ensure everything works
4. Check the browser console for errors

Your StayFinder app should now be live! 🎉 


## 🛠️ Tech Stack

- **Frontend**: React.js, SCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: SCSS with modern CSS features

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB Compass** (optional - app will work without it)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/zDiocampo/zeniark-reactjs-coding-challenge.git
cd zeniark-reactjs-coding-challenge
```

### 2. Install Backend Dependencies

```bash
cd web-app-backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../web-app
npm install
```

## 🗄️ Database Setup

### Option A: With MongoDB (Optional)

1. **Install MongoDB**:
   - Download from [MongoDB Official Website](https://www.mongodb.com/try/download/community)
   - Install as a Windows service during installation

2. **Start MongoDB Service**:
   ```bash
   net start MongoDB
   ```

3. **Seed the Database**:
   ```bash
   cd web-app-backend
   npm run seed
   ```

### Option B: Without MongoDB (Fallback Mode)

The application includes a built-in fallback system that automatically provides questions when MongoDB is unavailable. **No additional setup required** - the app will work out of the box!

## 🚀 Running the Application

### 1. Start the Backend Server

```bash
cd web-app-backend
npm start
```

The backend will start on `http://localhost:5000`

**Note**: If MongoDB is not running, the backend will automatically use local fallback data and log:
```
MongoDB connection failed, using local data: [error message]
Serving 20 questions from local data (MongoDB connection failed)
```

### 2. Start the Frontend Application

```bash
cd web-app
npm start
```

The frontend will start on `http://localhost:3000`

## 🔄 How the Fallback System Works

The application intelligently handles data sources:

1. **Primary Source**: MongoDB database
2. **Fallback 1**: If MongoDB is empty, uses local data
3. **Fallback 2**: If MongoDB connection fails, automatically switches to local data

### Fallback Scenarios:

- **MongoDB Running + Has Data**: Serves questions from database
- **MongoDB Running + Empty**: Serves questions from local fallback data
- **MongoDB Not Running**: Automatically serves questions from local fallback data
- **Network Issues**: Gracefully falls back to local data

### Benefits:

- **Zero Configuration**: Works immediately after installation
- **Development Friendly**: No need to set up MongoDB for development
- **Production Ready**: Automatically uses MongoDB when available
- **Fault Tolerant**: Continues working even if database issues occur

## 📁 Project Structure

```
zeniark-reactjs-coding-challenge/
├── web-app/                    # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Main application pages
│   │   ├── hooks/             # Custom React hooks
│   │   └── styles/            # SCSS styling
│   └── package.json
├── web-app-backend/            # Node.js backend
│   ├── config/                # Database configuration
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API endpoints
│   ├── scripts/               # Database seeding
│   ├── data/                  # Fallback questions data
│   └── package.json
└── README.md
```

## 🎯 Available Scripts

### Backend Scripts

```bash
cd web-app-backend

npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with questions
```

### Frontend Scripts

```bash
cd web-app

npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🌐 API Endpoints

- **GET** `/api/questions` - Retrieve all quiz questions
  - Returns questions from MongoDB if available
  - Automatically falls back to local data if MongoDB unavailable

## 📄 Configuration

### Environment Variables

Create a `.env` file in `web-app-backend/` (optional):

```env
MONGODB_URI=mongodb://localhost:27017/zeniark_quiz
PORT=5000
```

### Database Connection

The app automatically tries to connect to:
- **Primary**: `mongodb://localhost:27017/zeniark_quiz`
- **Fallback**: Local questions data (no configuration needed)

## 🚨 Troubleshooting

### Common Issues

1. **"MongoDB connection failed" message**:
   - This is normal when MongoDB isn't running
   - The app will automatically use fallback data
   - No action required

2. **Questions not loading**:
   - Check if backend is running on port 5000
   - Check browser console for errors
   - Verify CORS settings if accessing from different domain

3. **Port already in use**:
   - Change port in backend configuration
   - Or kill process using the port

### Development Tips

- **No MongoDB needed**: The fallback system ensures the app works immediately
- **Hot Reload**: Frontend automatically refreshes on code changes
- **API Testing**: Test endpoints using Postman or browser dev tools




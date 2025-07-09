# EfficienSee 👁️‍🗨️

**An Employee Productivity Monitoring System for Modern Workplaces**

---

## 📖 About The Project

EfficienSee is a comprehensive employee productivity monitoring system designed to help organizations track and analyze employee performance in real-time. The system combines advanced face detection technology, activity logging, and intuitive dashboards to provide actionable insights into workplace productivity.

### 🎯 Mission Statement
*"Enhancing Workplace Efficiency Through Smart Monitoring"* - Our platform provides transparent and ethical employee monitoring solutions that benefit both employers and employees by promoting accountability and productivity.

### ✨ Key Features
- 👤 **Face Detection Monitoring** - Real-time employee presence verification using computer vision
- ⌨️ **Activity Tracking** - Comprehensive keyboard and mouse activity logging
- 📊 **Productivity Analytics** - Track active duration and tab switch patterns
- 🔐 **Secure Authentication** - Role-based access control for employees and managers
- 📱 **Responsive Dashboards** - Intuitive interfaces for both employees and managers
- ☁️ **Cloud Storage** - Secure data storage using MongoDB Atlas
- 📈 **Real-time Reporting** - Live productivity metrics and historical data analysis

---

## 🛠️ Built With

### Frontend Technologies
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### Backend Technologies
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

### Database & Cloud
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### AI & Computer Vision
- **OpenCV** - Face detection and computer vision
- **Python Libraries** - Activity monitoring and data processing

---

## 🚀 Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB Atlas account
- Modern web browser
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/EfficienSee.git
   cd EfficienSee
2. **Setup Frontend**
```bash
  cd react-frontend
  npm install
  npm run dev
```
3. **Setup Backend**
```bash
cd backend
npm install
npm start
```
4. **Python Dependencies**
```bash
pip install opencv-python pymongo python-dotenv
```
5. **Environment Configuration**
- Create .env files in both frontend and backend directories
- Configure MongoDB Atlas connection string
- Set up authentication secrets

## 📁 Project Structure
### Frontend Structure
```
react-frontend/
├── src/
│   ├── Components/
│   │   ├── Assets/
│   │   ├── Counter/
│   │   ├── Featured/
│   │   ├── FetchingData/
│   │   ├── Footer/
│   │   ├── Intro/
│   │   ├── LoginSignup/
│   │   ├── Navbar/
│   │   └── ui/
│   ├── Firebase/
│   ├── pages/
│   │   ├── EmployeePage/
│   │   ├── LandingPage/
│   │   └── ManagerPage/
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json
```

### Backend Structure
```
backend/
├── config/
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Employee.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
│   ├── managerRoutes.js
│   └── monitoring.js
├── app.py
├── server.js
└── package.json
```

## 🔄 System Workflow
1. Landing Page
- Welcome interface with project overview
- Navigation to authentication system
2. User Authentication
- Secure signup/login system
- Role-based access control (Employee/Manager)
- JWT token-based authentication
3. Employee Dashboard
- Start Monitoring: Initiates Python script for:
- Face detection using OpenCV
- Keyboard and mouse activity logging
- Tab switch count tracking
- Active duration monitoring
- Stop Monitoring: Ends session and stores data in MongoDB Atlas
4. Manager Dashboard
- Fetches employee collections using Axios APIs
- Displays comprehensive productivity analytics
- Real-time and historical data visualization
- Team performance insights

## 💻 Usage
### For Employees
1. Login with employee credentials
2. Access employee dashboard
3. Click "Start Monitoring" to begin session
4. Work normally while system tracks productivity
5. Click "Stop Monitoring" to end session

### For Managers
1. Login with manager credentials
2. Access manager dashboard
3. View team productivity metrics
4. Analyze individual employee performance
5. Generate productivity reports

## 🔒 Privacy & Ethics
- Transparent Monitoring: Employees are aware of monitoring activities
- Secure Data Storage: All data encrypted and stored securely
- Role-based Access: Managers only see relevant team data
- Compliance Ready: Designed with workplace privacy regulations in mind

## 🤝 Contributing
- Fork the project
- Create feature branch (git checkout -b feature/NewFeature)
- Commit changes (git commit -m 'Add NewFeature')
- Push to branch (git push origin feature/NewFeature)
- Open Pull Request

## 📞 Contact
### Project Team
- Email: [your-email@domain.com]
- Subject: Engineering Design and Innovation
- Institution: [Your Institution Name]
## 📄 License
- This project is developed as part of the "Engineering Design and Innovation" coursework.
Copyright © 2024 EfficienSee Team. All rights reserved.

## 🙏 Acknowledgments
- Engineering Design and Innovation Course
- OpenCV Community
- MongoDB Atlas
- React Development Team
  
Built with 💼 for modern workplace efficiency

# hospital-management-system
A full-stack Hospital Management System built with the MERN stack (MongoDB, Express, React, Node.js). This application streamlines hospital operations, manages patient records, and enhances the efficiency of healthcare services.

## Features

- User authentication for Patients, Doctors, and Admins
- Patient management: records, appointments, and prescriptions
- Doctor management: profiles, schedules, and patient assignments
- Admin dashboard: manage doctors, admins, and hospital overview
- Responsive design with Tailwind CSS
- JWT-based authentication and secure APIs

## Technologies Used

- **Frontend:** React, React Router, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, dotenv

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Hospital-Management-System-MERN.git
   cd Hospital-Management-System-MERN
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory:
     ```
     DB_CONNECT=your_mongodb_connection_string
     ```

5. **Create the first admin:**
   - Edit `backend/createAdmin.js` with your admin details.
   - Run:
     ```bash
     node createAdmin.js
     ```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd backend
   node server.js
   ```

2. **Start the frontend app:**
   ```bash
   cd ../frontend
   npm start
   ```

3. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
Hospital-Management-System-MERN/
  backend/
    models/
    routes/
    .env
    server.js
    createAdmin.js
    package.json
  frontend/
    src/
    public/
    package.json
    tailwind.config.js
    postcss.config.js
  README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

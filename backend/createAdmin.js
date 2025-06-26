require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

    mongoose.connect(process.env.DB_CONNECT)
    .then(()=>{
        console.log('connect to db');
    })
    .catch((err)=>console.log(err));


async function createAdmin() {
  const admin = new Admin({
    firstName: "sachin",
    lastName: "kumar",
    email: "skt@gmail.com",
    password: "1234", 
    role: "admin"
  });

  try {
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");

    // Admin credentials
    const adminData = {
      firstname: "Admin",
      lastname: "User",
      email: "admin@gmail.com",
      mobile: "9876543210",
      password: "123456",
      role: "admin",
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      mongoose.connection.close();
      return;
    }

    // Create new admin user
    const newAdmin = await User.create(adminData);
    console.log("✅ Admin user created successfully!");
    console.log("\n📧 Admin Credentials:");
    console.log("========================");
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log("========================\n");
    console.log("You can now login to http://localhost:3001/");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();

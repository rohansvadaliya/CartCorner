const mongoose = require("mongoose");
const User = require("./models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const verifyAndFixAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully\n");

    const email = "admin@ecommerce.com";

    // Check if admin exists
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Found existing user:");
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      console.log(`Password Hashed: ${existingAdmin.password.substring(0, 20)}...`);
      
      // Fix the role if it's not admin
      if (existingAdmin.role !== "admin") {
        console.log("\n⚠️  Role is not 'admin', fixing...");
        existingAdmin.role = "admin";
        await existingAdmin.save();
        console.log("✅ Role updated to 'admin'");
      } else {
        console.log("\n✅ Role is already set to 'admin'");
      }
    } else {
      console.log("Admin user not found, creating new one...\n");
      
      const adminData = {
        firstname: "Admin",
        lastname: "User",
        email: "admin@ecommerce.com",
        mobile: "9876543210",
        password: "Admin@123456",
        role: "admin",
      };

      const newAdmin = await User.create(adminData);
      console.log("✅ Admin user created successfully!");
    }

    console.log("\n📧 Use these credentials to login:");
    console.log("========================");
    console.log(`Email: admin@ecommerce.com`);
    console.log(`Password: Admin@123456`);
    console.log("========================\n");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

verifyAndFixAdmin();

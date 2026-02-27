const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const generatePassword = (len = 12) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';
  let pw = '';
  for (let i = 0; i < len; i++) pw += chars[Math.floor(Math.random() * chars.length)];
  return pw;
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const email = 'admin@ecommerce.com';
    const newPassword = process.argv[2] || process.env.NEW_ADMIN_PASSWORD || generatePassword(12);

    let user = await User.findOne({ email });
    if (!user) {
      const adminData = {
        firstname: 'Admin',
        lastname: 'User',
        email,
        mobile: '9876543210',
        password: newPassword,
        role: 'admin',
      };
      user = await User.create(adminData);
      console.log('✅ Admin user created');
    } else {
      user.password = newPassword;
      await user.save();
      console.log('🔁 Admin password updated');
    }

    console.log('\n📧 Admin Credentials:');
    console.log('========================');
    console.log(`Email: ${email}`);
    console.log(`Password: ${newPassword}`);
    console.log('========================\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error resetting admin password:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
})();

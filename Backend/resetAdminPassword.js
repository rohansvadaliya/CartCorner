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

    const currentEmail = process.argv[2] || 'admin@gmail.com';
    const newEmail = process.argv[3] || currentEmail;
    const newPassword = process.argv[4] || process.env.NEW_ADMIN_PASSWORD || generatePassword(12);

    let user = await User.findOne({ email: currentEmail });
    if (!user) {
      const adminData = {
        firstname: 'Admin',
        lastname: 'User',
        email: newEmail,
        mobile: '9876543210',
        password: newPassword,
        role: 'admin',
      };
      user = await User.create(adminData);
      console.log('✅ Admin user created');
    } else {
      user.email = newEmail;
      user.password = newPassword;
      await user.save();
      console.log('🔁 Admin credentials updated');
    }

    console.log('\n📧 Admin Credentials:');
    console.log('========================');
    console.log(`Email: ${newEmail}`);
    console.log(`Password: ${newPassword}`);
    console.log('========================\n');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error resetting admin password:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
})();

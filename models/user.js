const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, enum:['user','organizer'], default: 'user'},
    isActive: { type: Boolean, default: true }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

  
module.exports = mongoose.model('User', userSchema);
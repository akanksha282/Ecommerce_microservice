const mongoose =require('mongoose')
const bcrypt = require('bcrypt');


const userSchema=new mongoose.Schema({
      username:{
        type:String,
        required:true,

      },
      email:{
          type:String,
          required:true,
          match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please Enter valid password'],
          unique:true,

      },
    address: {
    street: String,
    city: String,
    state: String,
    postalCode: String
  },
   phone: {
    type: Number,
    required:true
  },
  password:{
    type:String,
    required:true
  }
  
},{timestamps:true})

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
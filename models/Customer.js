const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: { 
        type: String, 
        required: true },
    phone_Number: {
       type :Number ,
       require:true,
    }
  });
 
  // Create a model
  const User = mongoose.model('User', userSchema);

  module.exports=User;

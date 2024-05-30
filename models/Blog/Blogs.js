const mongoose= require("mongoose");

const BlogSchema= mongoose.Schema({
         Tittle :{
            type : String,
            require:true,
         },
         Author :{
            type : String,
            require: true,

         },
         Content:{
            type :String,
            require: true,
         }
})

BlogModel=  mongoose.model("Blog", BlogSchema);

module.exports= BlogModel;

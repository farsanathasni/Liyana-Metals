const mongoose=require("mongoose")

const productsSchema=new mongoose.Schema(
  {
    name:{
        type:String,
        trim: true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
        trim: true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default: 0
    }
  },{timestamps: true}
)

const Products=mongoose.model("Products",productsSchema)

module.exports=Products


const Wishlist = require("../model/wishlist")

const addToWishlist=async(req,res)=>{
    try{
        const{userId,productId}=req.body
        const existingWishlist=await Wishlist.findOne({userId,productId})

        if(existingWishlist){
            return res.status(400).json({message:"Product already in wishlist"})
        }

        const wishlistItem=await Wishlist.create({
            userId,
            productId
        })

        const populateWishlist=await Wishlist.findById(wishlistItem._id).populate("productId")
        res.status(201).json(populateWishlist)
    }    
    catch(error){
        res.status(500).send(error.message)
    }
}

const getToWishlist=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find({
            userId:req.params.userId
        }).populate("productId")
        res.json(wishlist)
    }
    catch(error){
        res.status(500).send(error.message)
    }
}

const removeToWishlist=async(req,res)=>{
    try{
        const item=await Wishlist.findByIdAndDelete(req.params.id)
        if(!item){
            return res.status(404).send("Wishlist item not found")
        }
        res.send("Item removed from wishlist")
    }catch(error){
        res.status(500).send(error.message)
    }
}

module.exports={
    addToWishlist,removeToWishlist,getToWishlist
}
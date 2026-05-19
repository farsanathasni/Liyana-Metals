const Cart=require("../model/cart")

const addToCart=async(req,res)=>{
    try{

        const{userId,productId,quantity}=req.body

        const existsCartItem=await Cart.findOneAndUpdate(
            {userId,productId},
            {$inc:{quantity:quantity}},
            {returnDocument:"after"}
        ).populate("productId");

        if (existsCartItem) {
            return res.json(existsCartItem)
        }

        const cartItem=await Cart.create({
            userId,
            productId,
            quantity:quantity
        });

const populatedCart = await Cart.findById(cartItem._id).populate("productId");

res.status(201).json(populatedCart);        
    }
    catch (error) {
    res.status(500).send(error.message);
  }

}


const removeToCart=async(req,res)=>{
    try{
        const cartitem=await Cart.findByIdAndDelete(req.params.id)
        if(!cartitem){
            return res.status(404).send("Cart item not found")
        }

        res.send("Item removed");
    }
    catch (error) {
    res.status(500).send(error.message);
  }
}

const updateToCart=async(req,res)=>{
    try{
        const {quantity}=req.body

        const cartitem=await Cart.findByIdAndUpdate(
            req.params.id,
            {quantity},
            { returnDocument: "after" }
        ).populate("productId");

        if(!cartitem){
            return res.status(404).send("Cart item not found")
        }
        
        res.json(cartitem);
    }
    catch(error) {
    res.status(500).send(error.message);
  }
}


const getToCart=async(req,res)=>{
    try{
        const cart=await Cart.find({
            userId: req.params.userId
        }).populate("productId")
        res.json(cart)
    }
    catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports={addToCart,removeToCart,updateToCart,getToCart}
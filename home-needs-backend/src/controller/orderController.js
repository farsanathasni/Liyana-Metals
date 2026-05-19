const Order=require("../model/order")

const placeOrder=async(req,res)=>{
    try{
        const{userId,items,total,phone,customer,address,payment,status,name}=req.body

        const order=await Order.create({
            userId,items,total,customer,payment,status,name
        })
        res.status(201).json(order);

    }
    catch(error){
        res.status(500).send(error.message);
    }
}

const getToOrder=async (req,res)=>{
    try{
        const orders=await Order.find({
            userId:req.params.userId
        }).populate("items.productId")

        res.json(orders)
    }
     catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports={placeOrder,getToOrder}
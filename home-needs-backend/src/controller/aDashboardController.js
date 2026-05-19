const User=require("../model/user")
const Products=require("../model/products")
const Order=require("../model/order")

const getDashboard=async(req,res)=>{
    try{
      const totalUsers=await User.countDocuments()
      const totalProducts=await Products.countDocuments()
      const totalOrders=await Order.countDocuments()

        const revenue=await Order.aggregate([{$group:{_id:0,totalRevenue:{$sum:"$total"}}}])

        const totalRevenue=revenue[0]?.totalRevenue || 0

        const chartData = await Order.aggregate([
            {$unwind:"$items"},
            {$group:
                {
                _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      count: { $sum: "$items.quantity" }
    }
  },
  {
    $project: {
      name: "$_id",
      count: 1,
      _id: 0
    }
  },
  {
    $sort: { name: 1 }
  }
]);

         res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      chartData
    });


        }
    catch(error){
         res.status(500).send(error.message);
    }
}

module.exports = { getDashboard };
const Products=require("../model/products.js")


const getToProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 8;

    const search = req.query.search || "";
    const category = req.query.category || "";

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category && category !== "All Items") {
      query.category = category;
    }

    const product = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Products.countDocuments(query);

    res.json({
      product,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });

  } catch (error) {
    res.status(500).send(error.message);
  }
};



const getToProductsById=async(req,res)=>{
    try{
        const product=await Products.findById(req.params.id)
        if(!product){
            return res.status(404).send("not found")
        }
        res.json(product)
    }
    catch(error){
     return   res.status(500).send(error.message)
    }
}


const getCategories = async (req, res) => {
  try {
    const categories = await Products.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports={getToProducts,getToProductsById,getCategories}
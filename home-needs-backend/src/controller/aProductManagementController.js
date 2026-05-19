const Products=require("../model/products")

const getAllProducts=async(req,res)=>{
    try{
        const products=await Products.find();
        res.json(products)
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const addProducts=async(req,res)=>{
    try{
         const productData = {
      ...req.body
    };

    if (req.file) {
      productData.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

        const product=await Products.create(productData)
        res.status(201).json(product)
    }
    catch(error){
        console.log(error);
        
        res.status(400).send(error.message)
    }
}

const updateProducts=async(req,res)=>{
    try{
        const product=await Products.findByIdAndUpdate(
            req.params.id,req.body,
            { returnDocument: "after" }
        )
         if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const deleteProducts=async(req,res)=>{
    try{
        const product=await Products.findByIdAndDelete(req.params.id)

         if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports={getAllProducts,addProducts,updateProducts,deleteProducts}
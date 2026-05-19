const User=require("../model/user")

const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find().select("-password")
        res.json(users)

    }
    catch(error){
         res.status(500).send(error.message);
    }
}

const deleteUser=async(req,res)=>{
    try{
        const user=await User.findByIdAndDelete(req.params.id)

        if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted");
    }
    catch (error) {
    res.status(500).send(error.message);
  }
}

const updateUser=async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(
            req.params.id,req.body,
            { returnDocument: "after" }
        ).select("-password")

        if(!user){
            return res.status(404).send("User not found");
        }
        res.json(user)
    }
    catch (error) {
    res.status(500).send(error.message);
  }
}

const toggleUserStatus=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)

        if(!user){
            return res.status(404).send("User not found");
        }

        user.status=user.status==="active"?"blocked":"active"

        await user.save()

        res.json(user)
    }
     catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports={getAllUsers,deleteUser,updateUser,toggleUserStatus}
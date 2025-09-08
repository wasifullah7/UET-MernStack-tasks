const User = require('../models/userModels')

exports.getUserData =  async (req,res)=>{
        try {
            const userId = req.userId;
            const user = await User.findById(userId)
            if(!user){
                return res.json({message:"not found user"})
            }
            res.json({
                success:true,
                userData :{
                    name:user.name,
                    isAccountverified: user.isAccountverified
                }
            })
        } catch (error) {
    return res.json({err:error.message})
        }
}
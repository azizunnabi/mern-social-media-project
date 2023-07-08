const { validationResult}= require("express-validator");
const PostModel = require("../models/Post");
module.exports.createPost= async( req, res)=>{
    console.log("welcome to post")
    const errors = validationResult(req);
    if(errors.isEmpty()){
        try {
            const { postTitle, postDescription,user } = req.body;
            const createdPost = await PostModel.create({postTitle,postDescription,user});
            return res.status(200).json({msg : "Post has been created"});
   
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }else{
        return res.status(400).json({errors: errors.array()})
    }
}


//get/Display all posts
module.exports.getPosts = async (req, res)=>{
try {
   // console.log(user)
    const posts=await PostModel.find({user: req.user._id}).populate("user", "postTitle postDescription _id");

   // console.log(posts)
   return res.status(200).json(posts)
} catch (error) {
    return res.status(500).json({error: error.message})
}
}

//delete posts
module.exports.deletePosts = async(req,res)=>{
    const {id}=req.params
    //console.log(id)
  //req.params is used do display single id
  //req.query is used to display more then one fields
  const user= req.user._id;
  if( !id || id ===""|| id ===undefined){
return res.status(400).json({error: "id is required"})
  }

  try {
    //in below line {user} means {user: user}
    await PostModel.findByIdAndDelete({$and : [{_id: id},{user}]})
    return res.status(200).json({msg: "Deleted"})
  } catch (error) {
    return res.status(401).json({error: error.message})
  }
  
}

//update post
module.exports.updatePost = async (req,res)=>{
   
    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        
    const {postTitle,postDescription,postId}= req.body;
        try {

            const response = await PostModel.findOneAndUpdate({
             $and: [{_id: postId},{user: req.user._id}],
            },
            {$set : {
                postTitle,
                postDescription,
            },});
            return res.status(200).json({msg : "post has been updated",  post:response})
            console.log("post updated")
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}
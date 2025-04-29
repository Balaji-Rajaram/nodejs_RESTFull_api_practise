exports.simpleGet = async (req,res)=>{
    
    res.status(200).json({"message":"Response from GET method"})
}

exports.simplePost = async (req,res)=>{
   const {message} = req.body
   console.log(req.body  , 'getting ' , message );

   res.status(200).json({message})
}

exports.simplePut = async (req,res)=>{
    res.status(200).json({"message":"Response from PUT method"})
}
exports.simpleDelete = async (req,res)=>{
    res.status(200).json({"message":"Response from DELETE method"})
}


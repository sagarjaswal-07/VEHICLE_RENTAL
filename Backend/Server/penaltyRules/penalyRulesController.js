
const penaltyRules = require("./penaltyRulesModel")

add = (req,res) => {
    const validationError = []
    if(!req.body.penaltyRules)
    {
        validationError.push("Name is required")
    }
   
    if(validationError.length > 0)
    {
        res.json({
            status:422,
            success:false,
            message:"validation error occurs",
            error:validationError
        })
    }
    else{
        
            let penRule = new penaltyRules()
            penRule.penaltyRules = req.body.penaltyRules
           
            penRule.save()
            .then(
                (resSave) =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"data added successfully",
                        data:resSave
                    })
                }
            )
            .catch(
                (err) =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal Server Error",
                        errors:err.message
                     })
                }
            )
        }
    }

    //getall

    getall = async(req,res) =>{
        const count = await penaltyRules.countDocuments().exec()
    
        penaltyRules.find()
        .then(
            (penaltyRulesData)  =>{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully",
                    data:penaltyRulesData,
                    count:count
                })
            }
        )
        .catch(
            (err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internaln server error",
                errors:err.message
            })
    
            }
        )
    }


    //delete data
    
    deleteData = (req,res) =>{
        let validationError = []
        if(!req.body._id){
            validationError.push("id is required")
        }
        if(validationError.length > 0){
            res.json({
                status:422,
                success:false,
                message:"valiadtion error occurs",
                error:validationError
            })
        }
        else{
            penaltyRules.findOne({_id:req.body._id})
            .then((penaltyRulesData) =>{
                if(!penaltyRulesData){
                    res.json({
                        status:404,
                        success:false,
                        message:"data not found"
                    })
                }
                else{
                    penaltyRules.deleteOne({_id:req.body._id})
                    .then(() =>{
                        res.json({
                            status:200,
                            success:true,
                            message:"Data deleted successfully",
                            data:penaltyRulesData
                        })
                    })
                    .catch(() =>{
                        res.json({
                            status:500,
                            success:false,
                            message:"Internal server Error",
                            errors:err.message
                        })
                    })
                }
            })
            .catch(() =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal server Error",
                    errors:err.message
                })
            })
        }
    }
    

    //updateData
    
    updateData = (req,res) =>{
        let validationError = []
        if(!req.body._id)
        {
            validationError.push("id is required")
        }
        if(validationError.length > 0)
        {
            res.json({
                status:422,
                success:false,
                message:"Validation error occurs",
                error:validationError
            })
        }
        else{
            penaltyRules.findOne({_id:req.body._id})
            .then((penaltyRulesData) =>{
                if(!penaltyRulesData)
                {
                    res.json({
                        status:404,
                        success:false,
                        message:"Data not found"
                    })
                }
                else{
                    if(req.body.penaltyRules)
                    {
                        penaltyRulesData.penaltyRules = req.body.penaltyRules
                    }
                   
                    penaltyRulesData.save()
                    .then(
                        (resSave) =>{
                            res.json({
                                status:200,
                                success:true,
                                message:"Data Updated Successfully",
                                data:resSave
                            })
                        }
                    )
                    .catch(
                        (err) =>{
                            res.json({
                                status:500,
                                success:false,
                                message:"Internal server error",
                                errors:err.message
                            })
                        }
                    )
                }
            })
            .catch(
                (err) =>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                }
            )
        }
    }


    getsingle = (req,res) =>{
        const validationError = []
        if(!req.body._id){
            validationError.push("id is required")
        }
        if(validationError.length > 0){
            res.json({
                status:422,
                success:false,
                message:"validation error occurs",
                error:validationError
            })
        }
        else{
            penaltyRules.findOne({_id:req.body._id})
            .then((penaltyRulesData) =>{
                if(!penaltyRulesData){
                    res.json({
                        status:404,
                        success:false,
                        message:"Data not found"
                    })
                }
                else{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data loaded successfully",
                        data:penaltyRulesData
                    })
                }
            })
            .catch((err) =>{
                res.json({
                    status:500,
                    success:false,
                    message:"Internal serverv error",
                    errors:err.message
                })
            })
        }
    
    }

    module.exports ={
        add,
        getall,
        deleteData,
        updateData,
        getsingle
    }
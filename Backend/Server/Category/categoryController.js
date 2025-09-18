const category = require("./categoryModel")

add = (req,res) =>{
    let validationError = []

    if(!req.body.categoryName){
        validationError.push("category name is required")
    }
    if(!req.file){
        validationError.push("category image is required")
    }
    if(!req.body.description){
        validationError.push("description is required")
    }
    if(validationError.length > 0){
        res.json({
            status:422,
            success:false,
            message:"validation error occurrs",
            error:validationError
        })
    }
    else{
        category.findOne({categoryName:req.body.categoryName})
        .then((categoryData) =>{
            if(!categoryData)
            {
                let catObj = new category();
                catObj.categoryName = req.body.categoryName
                catObj.categoryImage = req.file.path
                catObj.description= req.body.description
                catObj.save()
                .then(
                   (resSave) =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"data added successfully",
                        data: resSave
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
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"data already exists",
                    data:categoryData
                })
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

//getall 

getall = async(req,res) =>{
    const totalCount = await category.countDocuments().exec()
    category.find()
    .then((categoryData) =>{
        res.json({
            status:200,
            success:false,
            message:"Data loaded successfully",
            data:categoryData,
            count:totalCount
        })
    })
    .catch((err) =>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error",
            errors:err.message
        })
    })
}

//getsingle

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
        category.findOne({_id:req.body._id})
        .then((categoryData) =>{
            if(!categoryData){
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
                    data:categoryData
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

//deleteData
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
        category.findOne({_id:req.body._id})
        .then((categoryData) =>{
            if(!categoryData){
                res.json({
                    status:404,
                    success:false,
                    message:"data not found"
                })
            }
            else{
                category.deleteOne({_id:req.body._id})
                .then(() =>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data deleted successfully",
                        data:categoryData
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
        category.findOne({_id:req.body._id})
        .then((categoryData) =>{
            if(!categoryData)
            {
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                if(req.body.categoryName)
                {
                    categoryData.categoryName = req.body.categoryName
                }
                if(req.file){
                    categoryData.categoryImage = req.file.path
                }
                if(req.body.description)
                {
                    categoryData.description = req.body.description
                 }
                categoryData.save()
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
module.exports ={
    add,
    getall,
    getsingle,
    deleteData,
    updateData
}
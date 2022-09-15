const { postProductService } = require("../services/product.services");






exports.createProduct = async (req, res, next) => {
    console.log(req.body);

    try {
        // save method

        // const product = new Product(req.body)
        // const result = await product.save()

        // create method
      
      const result = await postProductService(req.body)

      // @ difference between save and create is you can do anything before save and that can impactful in save. but can't do anything before create. 

        res.status(200).json({
            status: "success",
            message: "Your product added successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Data inserted failed",
            error: error.message,
        });
    }
}
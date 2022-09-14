const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// schema design

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide a name for this product"],
            trim: true,
            unique: [true, "Name must be unique"],
            minLength: [3, "Name must be at least 3 character"],
            maxLength: [100, "Name is too large"],
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price can't be negative"],
        },
        unit: {
            type: String,
            required: true,
            enum: {
                values: ["kg", "litre", "pcs"],
                message: "unit value can't be {VALUE}, must be kg/litre/pcs",
            },
        },
        quantity: {
            type: Number,
            required: true,
            min: [0, "quantity can't be negative"],
            validate: {
                validator: (value) => {
                    isInteger = Number.isInteger(value);
                    if (isInteger) {
                        return true;
                    }
                    return false;
                },
            },
            message: "Quantity must be an integer",
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["in-stock", "out-of-stock", "discontinued"],
                message: "status can't be {VALUE}",
            },
        },
        // createdAt: {
        //   type: Date,
        //   default: Date.now,

        // },
        // updatedAt: {
        //   type: Date,
        //   default: Date.now,
        // }
        // no need this if we use timestamps----------------------^

        // supplier: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref:"Supplier"
        // },
        // categories: [{
        //   name: {
        //     type: String,
        //     required:true,
        //   },
        //   _id: mongoose.Schema.Types.ObjectId,
        // }]
    },
    {
        timestamps: true,
    }
);

// model create------------->

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
    console.log(req.body);

    try {
        // save method

        // const product = new Product(req.body)
        // const result = await product.save()

        // create method
      
      const result = await Product.create(req.body)

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
});

module.exports = app;

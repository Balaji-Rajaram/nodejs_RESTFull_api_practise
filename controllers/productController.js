// src/controllers/productController.js
const Product = require('../models/productModel.js')

// Create (POST)
exports.createProduct = async (req, res) => {
    try {
        const  { name, description, price} = req.body ;
        const newProduct = new Product({name,description,price})
        // logc here 
        const savedProduct = await newProduct.save();
        console.log({savedProduct,newProduct});
        
        res.status(201).json(savedProduct);


    } catch (error) {
        res.status(400).json({ message: 'Error creating product', error });
    }
};

// Read/View (GET)
exports.getProducts = async (req, res) => {
    try {
       const allProducts = await Product.find()
       
        res.status(200).json(allProducts)

    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// Get by ID (GET)
exports.getProductById = async (req, res) => {
    try {
        let {id} = req.params 
        const product = await Product.findById(id)

        res.status(200).json(product)
        

    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// Update (PUT)
exports.updateProduct = async (req, res) => {
    try {
        let {id} = req.params 
        const  { name, description, price} = req.body ;
        const product = await Product.findByIdAndUpdate(id,{ name, description, price} , {new:true})

        res.status(200).json(product)

    } catch (error) {
        res.status(400).json({ message: 'Error updating product', error });
    }
};

// Delete (DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const {id} = req.params 
        await Product.findByIdAndDelete(id);
        res.status(200);
        res.json({"message": 'Product deleted successfully'})


    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

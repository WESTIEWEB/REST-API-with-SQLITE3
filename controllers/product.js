const ProductServices = require('../services/product');
const { validateProducts } = require('../utils/validations/productsValidation');
const { MSG_TYPES } = require('../utils/msgTypes')


exports.createProduct = async (req, res) => {
    try {
        const { error } = validateProducts(req.body);
        if(error) return res.status(400).json({ message: error.details[0].message})

        const product = await ProductServices.createProduct(req.body);

        res.status(201).json({ message: MSG_TYPES.PRODUCT_CREATED, product})

    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const product = await ProductServices.getProducts();
        res.status(201).json({ message: MSG_TYPES.PRODUCT_FETCHED, product})
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await ProductServices.getProductByid(req.params.id);
        res.status(201).json({ message: MSG_TYPES.PRODUCT_FOUND, product})
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

exports.updateProduct = async (req, res) => {
    try{
        const product = await ProductServices.updateProduct(req.params.id, req.body);
        res.status(201).json({ message: MSG_TYPES.PRODUCT_UPDATED, product });
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}

exports.deletProduct = async (id) => {
    try {
        const product = await ProductServices.deleteProduct(req.params.id);
        res.status(201).json({ message: MSG_TYPES.PRODUCT_DELETED })
    } catch (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
}
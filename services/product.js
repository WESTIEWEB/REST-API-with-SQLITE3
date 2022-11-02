const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Product } = require("../models");
const HttpError = require("../utils/httpError");

exports.createProduct = async (data) => {
    const { name,
        image,
        brand,
        price,
        category,
        description,
        countInStock, 
        rating, 
        numReviews
    ,} = data;

    const product = await Product.create({
        name,
        image,
        brand,
        price,
        category,
        description,
        countInStock, 
        rating, 
        numReviews   
    })

    return product
}

exports.getProducts = async () => {
    const products = await Product.findAll();

    return products;
}

exports.getProductByid = async (id) => {
    const product = await Product.findByPk(id);
    if(!product) throw new HttpError("Product not found", 404);

    return product;
}

exports.updateProduct = async (id, data) => {
    const product = await product.findByPk(id);
    const {
        name,
        image,
        brand,
        category,
        description,
        price,
        countInstock,
        rating,
        numReviews,
    } = data;

    product.name = name;
    product.image = image
    product.brand = brand;
    product.category = category;
    product.description = description;
    product.price = price;
    product.countInstock = countInstock;
    product.rating = rating;
    product.numReviews = numReviews;

    await product.save()

    return product;
}

exports.deleteProduct = async (id) => {

    const product = await Product.findByPk(id);
    if(!product) throw new HttpError("product not found", 404);

    await product.destroy();
    return product;

}
const joi = require('joi');

const validateProducts = (entry) => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        brand: joi.string().min(3).max(225).required(),
        category: joi.string().min(3).max(225).required(),
        description: joi.string().min(11).max(225).required(),
        price: joi.number().min(0).required(),
        rating: joi.number().min(0).required(),
        countInStock: joi.number().min(0).required(),
        numReviews: joi.number().min(0).required(),
    })
    return schema.validate(entry);
}
module.exports = { validateProducts }

    /**
 * {
  name: "Ankara",
  image: "https://product image here",
  brand: "Nike",
  category: "men shoes",
  description: "Buy this nice product",
  price: 4200,
  countInStock: 7,
  rating: 6,
  numReviews: 5,
  }
 */
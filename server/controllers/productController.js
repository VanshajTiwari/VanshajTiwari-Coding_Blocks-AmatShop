const Product = require("../models/Product");

// handle errors
const handleErrors = (err) => {
    console.log({ 'in product controller':err});
    return err;
  };

module.exports.addProduct = async (req, res) => {
    // const { title, description, price, category, brand, image, stock, reviews } = req.body;
    try {
        await Product.create(req.body)
        res.send("product created successfully")
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.updateProduct = async (req, res) => {
    // const { title, description, price, category, brand, image, stock, reviews } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.body.id, req.body.data, { new: true });
        res.json(product);
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.id});
        res.status(200).send("deleted product");
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const prods = await Product.find()
        res.status(200).send(prods)
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}
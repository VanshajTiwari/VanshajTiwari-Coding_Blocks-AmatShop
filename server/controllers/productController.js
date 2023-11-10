const Product = require("../models/Product");

// handle errors
const handleErrors = (err) => {
    console.log({ 'in product controller':err});
    return err;
  };

module.exports.addProduct = async (req, res) => {
    // const { title, description, price, category, brand, image, stock, reviews } = req.body;
    try {
        // Handle image upload
        const uploadedImage = req.files[0];

        // Check if an image was uploaded
        if (!uploadedImage) {
        return res.status(400).send('No image file provided');
        }

        // Extract relevant information from the uploaded file
        const { originalname } = uploadedImage;

        // You can also extract additional information from the request, e.g., description, user ID, etc.
        let data = JSON.parse(req.body.data)
        data = { ...data, image: originalname};
        console.log(data);
        // Create a new image record in the database
        await Product.create(data);

        res.send("product created successfully")
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.updateProduct = async (req, res) => {
    // const { title, description, price, category, brand, image, stock, reviews } = req.body;
    try {
        const productId = req.params.productId.substring(1);
        console.log(productId);
        const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        console.log(product);
        res.json(product);
    }catch (err) {
        const errors = handleErrors(err);
        console.log(err)
        res.status(400).send({ errors });
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId.substring(1);
        await Product.findOneAndDelete({ _id: productId});
        res.status(200).send("deleted product");
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const { category, minPrice, brand, maxPrice, keywords } = req.query;

        // Build a filter object based on the provided criteria
        const filter = {};

        if (category) {
        filter.category = category;
        }

        if (brand) {
            filter.brand = brand;
        }

        if (minPrice) {
        filter.price = { $gte: parseFloat(minPrice) };
        }

        if (maxPrice) {
            if (!filter.price) {
                filter.price = {};
            }
            filter.price.$lte = parseFloat(maxPrice);
        }

        if (keywords) {
            filter.$or = [
                { title: { $regex: keywords, $options: 'i' } },
              ];
        }
        // Query the products based on the filter
        const products = await Product.find(filter);

        res.status(200).json(products)
    }catch (err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}


module.exports.reviewProduct = async (req, res) => {
    try {
        const productId = req.params.productId.substring(1);
        const { rating, comment } = req.body;

        if (!req.session){
            res.status(404).json("not logged in");
        }
    
        // Create a new review object
        const newReview = {
          username: req.session.username,
          rating,
          comment,
        };
    
        // Use the $push operator to add the new review to the product's 'reviews' array
        const result = await Product.updateOne(
          { _id: productId },
          { $push: { reviews: newReview } }
        );
    
        if (result.nModified === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        res.json({ message: 'Review added successfully', review: newReview });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the review' });
      }
}
const Product = require("../models/Product");
const schedule = require('node-schedule')

let expire = 10*1000;

// handle errors
const handleErrors = (err) => {
  console.log({ "in product controller": err });
  return err;
};

module.exports.addProduct = async (req, res) => {
  // const { title, description, price, category, brand, image, stock, reviews } = req.body;
  try {
    // Handle image upload
    const uploadedImage = req.files? req.files[0] : {originalname: ""};

    // Check if an image was uploaded
    if (!uploadedImage) {
      return res.status(400).send("No image file provided");
    }

    // Extract relevant information from the uploaded file
    const { originalname } = uploadedImage;

    // You can also extract additional information from the request, e.g., description, user ID, etc.
    // let data = JSON.parse(req.body.data);
    let data = req.body
    data = { ...data, image: originalname };
    console.log(data);
    // Create a new image record in the database
    await Product.create(data);

    // console.log(req.body.title)
    // console.log(req?.file)
    // console.log(req?.files)

    res.send("product created successfully");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.updateProduct = async (req, res) => {
  // const { title, description, price, category, brand, image, stock, reviews } = req.body;
  try {
    const productId = req.params.productId.substring(1);
    console.log(productId);

    const uploadedImage = req.files ? req.files[0] : null;

    let data = req.body;
    // Check if an image was uploaded
    if (uploadedImage) {
      // return res.status(400).send("No image file provided");
      const { originalname } = uploadedImage;
      data = { ...data, image: originalname };
    }
    
    console.log(data);

    const product = await Product.findByIdAndUpdate(productId, data, {
      new: true,
    });
    console.log(product);
    res.json(product);
  } catch (err) {
    const errors = handleErrors(err);
    console.log(err);
    res.status(400).send({ errors });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId.substring(1);
    await Product.findOneAndDelete({ _id: productId });
    res.status(200).send("deleted product");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

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
      filter.$or = [{ title: { $regex: keywords, $options: "i" } }];
    }
    // Query the products based on the filter
    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).send({ errors });
  }
};

module.exports.reviewProduct = async (req, res) => {
  try {
    const productId = req.params.productId.substring(1);
    const { rating, comment } = req.body;

    if (!req.session) {
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
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the review" });
  }
};

module.exports.sale = async (req, res) => {
  try {
    const { category, brand, reductionPercentage, duration } = req.body;
    // Validate input
    if (!category && !brand) {
      return res
        .status(400)
        .json({ error: "Category or brand must be provided." });
    }

    // Calculate the end date based on the provided duration
    const discountedUntil = new Date();
    discountedUntil.setDate(discountedUntil.getDate() + duration); // Assuming duration is in days

    console.log(discountedUntil.getUTCDate())

    // Update products directly in the database
    const query = { $or: [{ category }, { brand }] };
    const update = {
      $mul: { salePrice: 1 - reductionPercentage / 100 }, // Multiply the price by (1 - percentage/100)
      $set: {
        saleTime: discountedUntil, // Set new discountedUntil
      },
    };

    const bulkOperations = [{ updateMany: { filter: query, update: update } }];

    await Product.bulkWrite(bulkOperations);

    return res.status(200).json({ message: "Prices reduced successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const revertPricesJob = schedule.scheduleJob("0 0 * * *", 
// setTimeout(
async () => {
  try {
    console.log("revertPricesJob");
    const expiredProducts = await Product.find({
      saleTime: { $lte: new Date() },
    // category: "cat1"
    });
    console.log(expiredProducts);
    const bulkOperations = expiredProducts.map((product) => ({
      updateOne: {
        filter: { _id: product._id },
        update: {
          $set: {
            salePrice: product.price,
            saleTime: null, // Reset discountedUntil
          },
        },
      },
    }));

    await Product.bulkWrite(bulkOperations);
    console.log("Prices reverted successfully.");
  } catch (error) {
    console.error("Error reverting prices:", error);
  }
})
// }, expire);

const Order = require('../models/Orders')

module.exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    }catch (err) {
        res.status(404).json("error getting orders")
    }
}

module.exports.getUserOrder = async (req, res) => {
    try {
        const userId = req.session.userId
        const orders = await Order.find({ user: userId }).populate("products.product");
        let retArr = []

        orders.forEach(order => {
            retArr = [...retArr, ...order.products]
        })

        res.status(200).json(retArr);
    }catch (err) {
        res.status(404).json("error getting orders")
    }
}

module.exports.cancelOrder = async (req, res) => {
    try {
        const orders = await Order.findById(req.body.id);
        if (orders.user != req.session.userId || orders.status == "Delivered") {
            res.status(404).json("not valid request")
        }
        orders.status = "Cancelled"
        orders.save()
        res.status(200).json("order cancelled")
    }catch (err) {
        res.status(404).json("error cancelling order")
    }
}
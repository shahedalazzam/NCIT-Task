const mongoose = require('mongoose')



const itemSchema = new mongoose.Schema({
    Name: String,
    Category: String,
    Price: String,
    Color: String,
    Img: String,
    Brand: String,
    Size: String

},
)

const orderSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    Items: [
        {
            Item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Item',
            },
            Count: {
                type: Number,
                min: 1, // Ensure a positive quantity
            },
        },
    ],
    OrderDate: {
        type: Date,
        default: Date.now, // Default to the current date
    },
    TotalPrice: {
        type: Number,
        min: 0, // Ensure a non-negative total price
    },
}
)


const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Item, Order }
const mongoose = require('mongoose')



const itemSchema = new mongoose.Schema({
    Name: String,
    PassMark: String

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
}
)


const Item = mongoose.model('Item', itemSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Item, Order }
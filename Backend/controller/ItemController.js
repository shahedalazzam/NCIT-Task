const { Order, Item } = require("../models/ItemsModels");
const UserModel = require("../models/UserModels");

exports.CreatItem = async (req, res) => {
    const { Name, Size } = req.body
    try {

        const ItemExist = await Item.findOne({ Name }).catch((err) => {
            console.log("Error: ", err)
        })

        if (ItemExist) {
            return res.status(409).json({ message: "Item already Exist" })
        }
        else {
            const ItemCreate = await Item.create({
                Name,
                Size
            })

            res.status(201).json({
                message: "Successful Create Item",
                data: {
                    Name: ItemCreate.Name,
                    Size: ItemCreate.Size
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error: "Cannot Create Item" });
    }
}

exports.DeleteItem = async (req, res) => {
    const id = req.params.id

    await Item.findByIdAndDelete({ _id: id })

    const newItems = await Item.find()

    res.status(200).json({
        message: "Successful Delete Item",
        data: {
            newItems
        }
    })
}

exports.GetItem = async (req, res) => {
    try {
        const Items = await Item.find();
        res.status(200).json({
            data: {
                Items
            },
        })

    } catch (error) {
        res.status(500).json({ error: "Cannot Find The Item" });
    }
}

exports.UpadetItem = async (req, res) => {
    const id = req.params.id
    const { Name, Size } = req.body
    const newItem = await Item.findByIdAndUpdate({ _id: id },
        {
            $set: {
                Name,
                Size
            }
        },
        { new: true })

    res.status(200).json({
        message: "Edit Item successfully",
        data: {
            newItem
        }
    })

}

exports.GetItemId = async (req, res) => {
    const id = req.params.id
    try {
        const item = await Item.findById({ _id: id })
        res.status(200).json({
            data: {
                item
            },
        })

    } catch (error) {
        res.status(500).json({ error: "Cannot Find The Item" });
    }
}

exports.CreatOrder = async (req, res) => {
    const { User, Items, TotalPrice } = req.body

    try {

        const OrderCreate = await Order.create({
            User,
            Items,
            TotalPrice
        })

        res.status(201).json({
            message: "Successful Create Order",
            data: {
                User: OrderCreate.User,
                Items: OrderCreate.Items,
                TotalPrice: OrderCreate.TotalPrice,
            }
        })

    } catch (error) {
        res.status(500).json({ error: "Cannot Create Order" });

    }
}

exports.GetAllOrders = async (req, res) => {
    try {
        const Orders = await Order.find();

        // Create an array to store user information for each order
        const users = [];

        // Loop through each order to retrieve user information
        for (const order of Orders) {
            const user = await UserModel.findById(order.User);
            users.push(user);
        }

        const ItemsId = Orders.map((order) => {
            return order.Items.map((item) => item.Item);
        }).flat();

        const OrderItems = await Item.find({ _id: { $in: ItemsId } });

        res.status(200).json({
            data: {
                Orders,
                users,
                OrderItems,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Cannot find the order" });
    }
};

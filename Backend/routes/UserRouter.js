const UserController = require('../controller/UserController')
const ItemController = require('../controller/ItemController')
const express = require('express')
const router = express.Router()


router.route("/sign-up").post(UserController.CreatUser)
router.route("/sign-in").post(UserController.GetUser)
router.route("/order/create").post(ItemController.CreatOrder)
router.route("/order").get(ItemController.GetAllOrders)



router.route("/item/:id").get(ItemController.GetItemId)

module.exports = router
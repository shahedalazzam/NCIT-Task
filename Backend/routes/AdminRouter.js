const AdminController = require('../controller/AdminController')
const express = require('express')
const router = express.Router()


router.route("/add").post(AdminController.CreatUser)
router.route("/login").post(AdminController.GetUser)
router.route("/delete/:id").delete(AdminController.DelUser)
router.route("/update/:id").patch(AdminController.UpdateUsers)
router.route("/").get(AdminController.GetAllUsers)

const ItemController = require('../controller/ItemController')

router.route("/item/add").post(ItemController.CreatItem)
router.route("/item/delete/:id").delete(ItemController.DeleteItem)
router.route("/item/update/:id").patch(ItemController.UpadetItem)
router.route("/item/").get(ItemController.GetItem)

module.exports = router
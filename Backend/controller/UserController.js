const User = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETKEY);
};

exports.CreatUser = async (req, res) => {
    const { FirstName,LastName, Email, Password, Phone, Img } = req.body
    const FullName=`${FirstName} ${LastName}`
    try {

        const UserExist = await User.findOne({ Email }).catch((err) => {
            console.log("Error: ", err)
        })

        if (UserExist) {
            return res.status(409).json({ message: "User already Exist" })
        }
        else {
            const PasswordHash = bcrypt.hashSync(Password, 12)
            const UserCreate = await User.create({
                Role:"user",
                FullName,
                Email,
                Password: PasswordHash,
                Phone,
                Img
            })




            const UserToken = signToken(UserCreate._id)
            res.status(201).json({
                message: "Successful Create User",
                UserToken,
                data: {
                    Role:UserCreate.Role,
                    FullName: UserCreate.FullName,
                    Email: UserCreate.Email,
                    Password: UserCreate.Password,
                    Phone: UserCreate.Phone,
                    Img: UserCreate.Img

                }
            })
        }


    } catch (error) {
        res.status(500).json({ error: "Cannot register the user" });
    }
}

exports.GetUser = async (req, res) => {
    const { Email, Password } = req.body
    try {

        const UserExist = await User.findOne({ Email }).catch((err) => {
            console.log("Error: ", err)
        })

        if (UserExist) {
            const isMatch = await UserExist.comparePass(Password, UserExist.Password)

            if (isMatch) {
                const UserToken = signToken(UserExist._id)
                return res.status(200).json({
                    data: {
                        id: UserExist._id,
                        FullName: UserExist.FullName,
                    },
                    message: "login successful",
                    UserToken
                })
            }
        }
        else {
            return res.status(404).json({ message: "User does not exists" })


        }

    } catch (error) {
        res.status(500).json({ error: "Cannot Login the user" });
    }
}
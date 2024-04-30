import { comaparePassword, hashPassword } from "../helpers/authHelpers.js"
import User from "../models/UserModels.js"
import JWT from "jsonwebtoken";
import orderModel from '../models/orderModel.js'
import UserModels from "../models/UserModels.js";


export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body

        // validations 
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }

        // Existsing user
        let existinguser = await User.findOne({ email });

        if (existinguser) {
            return res.status(200).send({
                sucess: false,
                message: "User already exists please login"
            });
        }

        // hasing password
        const hashedpassword = await hashPassword(password);

        // saving user
        const user = await new User({
            name,
            email,
            phone,
            address,
            password: hashedpassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registeration',
            error
        })
    }
}

// Login

export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body

        // validations
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or Password"
            })
        }

        //check user
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "No user Found"
            })
        }
        const match = await comaparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                sucess: false,
                message: "Invalid password"
            });
        }
        // token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        })
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                adddress: user.address,
                role: user.role
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }

}

// verify user and Admin via middle ware 
//test controller
export const verifyController = (req, res) => {
    try {
        res.send("Protected Admin");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};

//  get all  users admin  
export const getUsercontroller = async ( req,res) =>{
    try {
        const user = await UserModels
            .find({})
            res.status(200).json({ user });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting user",
            error,
        });
    }
}

//update prfole
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await User.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({buyer: req.user_id})
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders.products);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//orders
export const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({})
            .populate("products", "-photo")
            .populate("buyer", "name")
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
};

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

// Total orders by count 
export const getTotalOrdersCountController = async (req, res) => {
    try {
        const totalCount = await orderModel.countDocuments();
        res.json({ totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting total orders count",
            error,
        });
    }
};


// Total users by count 
export const getTotalusersCountController = async (req, res) => {
    try {
        const totalCount = await UserModels.countDocuments();
        res.json({ totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting total orders count",
            error,
        });
    }
};

// get total orders of particular user 
export const getOrdersCountController = async (req, res) => {
    try {
        const totalCount = await orderModel.countDocuments({ buyer: req.user._id });
        res.json({ totalCount });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting total orders count",
            error,
        });
    }
};

import { prisma } from "../libs/prisma.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

async function register (req, res){
    const { username, email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(user) {
       return res.status(200).json({
           message: "Email is already exist"
       });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword }
    });

    return res.status(201).json({
        message: "User registered successfully"
    });
}

async function login (req, res) {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if(!user) {
        return res.json({
            message: "user is not registered"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({
            message: "Invalid credentials"
        })
    }

    user.password = undefined;

    const token = jwt.sign({ user }, 'secretkey')

    return res.json({
        message: "login successfully",
        token
    });
}

export default { register, login }
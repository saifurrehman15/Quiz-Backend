import UserModel from "./model/auth.model.js"
import bcrypt from "bcryptjs"

class AuthService {
    #userModel = UserModel
    constructor() {

    }

    async register(value) {
        const found = await this.#userModel.findOne({
            where: {
                email: value.email
            }
        })
        console.log(found);

        if (found) {
            return {
                error: true,
                message:
                    "User already exists!",
                status: 403
            }
        }
        const hashPassword = await bcrypt.hash(value.password, 10)
        value.password = hashPassword

        const created = await this.#userModel.create(value);

        if (!created) {
            return {
                error: true,
                message: "Failed to create user!",
                status: 403
            }
        }

        return {
            error: false,
            message: "User created successfully!",
            status: 201,
            data: created
        }
    }

    async login(value) {
        const found = await this.#userModel.findOne({
            where: {
                email: value.email
            }
        })

        if (!found) {
            return {
                error: true,
                message:
                    "User not exist!",
                status: 404
            }
        }
        const comparedPassword = await bcrypt.compare(value.password, found.password)

        if (!comparedPassword) {
            return {
                error: true,
                message: "Invalid credentials!",
                status: 401
            }
        }

        return {
            error: false,
            message: "User login successfully!",
            status: 201,
            data: found
        }
    }
}

export default new AuthService()
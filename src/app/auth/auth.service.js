import UserModel, { Role, UserRole } from "./model/auth.model.js"
import bcrypt from "bcryptjs"

class AuthService {
    #userModel = UserModel
    #roleModel = Role
    constructor() {
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }

    async register(value) {
        const found = await this.#userModel.findOne({
            where: {
                email: value.email
            },

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


        const plain = created.get({ plain: true })
        const role = await this.#roleModel.findOne({
            where: { name: 'user' }
        });

        console.log('ROLE',role);
        

        if (!role) {
            return {
                error: true,
                message: "Default role not found!",
                status: 500
            }
        }

        await UserRole.create({
            user_id: plain?.id,
            role_id: role?.id
        })

        const found2 = await this.#userModel.findOne({
            where: {
                id: plain.id,

            },
            include: [{
                model: this.#roleModel, as: 'roles', attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });
        
        return {
            error: false,
            message: "User created successfully!",
            status: 201,
            data: found2
        }
    }

    async login(value) {
        const found = await this.#userModel.findOne({
            where: {
                email: value.email
            },
            include: [{
                model: this.#roleModel, as: 'roles', attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
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
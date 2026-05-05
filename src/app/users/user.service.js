import { pagination } from "../../utils/db/pagination.js"
import { CheatModel } from "../auth/model/auth.model.js"
import UserModel from "./model/user.model.js"
import { Op } from 'sequelize'

class UserService {
    #userModel = UserModel
    #cheatedModel = CheatModel

    constructor() {
        this.show = this.show.bind(this)
        this.createCheated = this.createCheated.bind(this)
        this.cheatedClear = this.cheatedClear.bind(this)
    }

    async show(value) {
        const offset = (value.page - 1) * value.limit;

        const { rows, count } = await this.#userModel.findAndCountAll({
            where: {
                first_name: {
                    [Op.like]: `%${value?.search}%`
                }
            },
            attributes: { exclude: ['password'] },
            offset,
            limit: value?.limit,
            order: [['created_at', 'DESC']],
        })

        if (!rows) {
            return {
                error: true,
                message: "Users not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Users fetched successfully!",
            status: 200,
            data: rows,
            pagination: { ...pagination({ count, limit: value?.limit, page: value?.page }) }
        }
    }

    async createCheated(value) {
        const found = await this.#cheatedModel.findOne({
            where: {
                user_id: value?.user_id
            }
        })

        if (found) {
            return {
                error: true,
                message: "Already Cheated Found!",
                status: 403,
                data: null
            }
        }
        const attemp_time = new Date().toISOString();
        console.log(attemp_time);

        const created = await this.#cheatedModel.create({ ...value, attemp_time });

        if (!created) {
            return {
                error: true,
                message: "Failed to create cheat!",
                status: 403,
                data: null
            }
        }

        return {
            error: false,
            message: "Cheated created successfully!",
            status: 201,
            data: created
        }
    }

    async cheatedClear(id) {
        const cleared = await this.#cheatedModel.destroy({ where: { user_id: id } });
        
        if (!cleared) {
            return {
                error: true,
                message: "Failed to clear cheat!",
                status: 403,
                data: null
            }
        }
        
        return {
            error: false,
            message: "Cheated cleared successfully!",
            status: 200,
            data: cleared
        }
    }
}

export default new UserService()

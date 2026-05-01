import { pagination } from "../../utils/db/pagination.js"
import SubjectModel from "./model/subject.model.js"

class SubjectService {
    #subjectModel = SubjectModel
    constructor() {
        this.create = this.create.bind(this)
        this.show = this.show.bind(this)
    }

    async create(value) {
        const findSubject = await this.#subjectModel.findOne({
            where: { name: value?.name }
        })

        if (findSubject) {
            return {
                error: true,
                message: "Subject is already exists!",
                data: null,
                status: 403
            }
        }

        const created = await this.#subjectModel.create(value)
        const plainObj = created.get({ plain: true })

        return {
            error: false,
            message: "Subject created successfully!",
            data: plainObj,
            status: 201
        }
    }

    async show(value) {
        const offset = (value.page - 1) * value.limit;
        console.log(offset, value.limit);

        const { rows, count } = await this.#subjectModel.findAndCountAll({
            offset,
            limit: value?.limit,
            order: [['created_at', 'DESC']],
        })
        console.log(rows, count);

        if (!rows) {
            return {
                error: true,
                message: "Subjects not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Subjects fetched successfully!",
            status: 200,
            data: rows,
            pagination: { ...pagination({ count, limit: value?.limit, page: value?.page }) }
        }
    }
}

export default new SubjectService()
import { responseSender } from "../../utils/helpers/response-sender.js";
import subjectsService from "./subjects.service.js";
import { subjectValidate } from "./validations/index.js"

class SubjectService {
    #subjectService = subjectsService
    #validateSubject = subjectValidate

    constructor() {
        this.create = this.create.bind(this)
        this.show = this.show.bind(this)
    }

    async create(req, res) {
        try {
            const { error, value } = this.#validateSubject.validate(req.body);
            console.log(error);

            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null,
                    status: 400
                })
            }

            const result = await this.#subjectService.create(value)

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null,
                })
            }
            console.log('RESULT', result);

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data,
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                message: 'Internal Server Error!',
                data: null
            })
        }
    }

    async show(req, res) {
        try {
            const { query } = req
            const page = Number(query?.page) || 1;
            const limit = Number(query?.limit) || 5;
            const search = req.search || ''

            const result = await this.#subjectService.show({ page, limit, search });

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }

            return responseSender(res, result.status, {
                message: result.message,
                data: result.data,
                pagination: result.pagination
            })
        } catch (error) {
            console.log(error);

            return responseSender(res, 500, {
                message: 'Internal Server Error!',
                data: null
            })
        }
    }
}

export default new SubjectService()
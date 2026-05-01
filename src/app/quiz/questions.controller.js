import { responseSender } from "../../utils/helpers/response-sender.js"
import questionsService from "./questions.service.js"

class QuestionController {
    #questionService = questionsService
    constructor() {
        this.show = this.show.bind(this)
    }

    async show(req, res) {
        try {
            const { id } = req.params

            const result = await this.#questionService.show(id)

            if (result.error) {
                return responseSender(res, result.status, {
                    message: result.message,
                    data: null
                })
            }
            return responseSender(res, result.status, {
                message: result.message,
                data: result.data
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

export default new QuestionController()
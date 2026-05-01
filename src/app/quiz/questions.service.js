import { QuestionsModel } from "./model/quiz.model.js"

class QuestionService {
    #questionModel = QuestionsModel
    constructor() {
        this.show = this.show.bind(this)
    }

    async show(quiz_id) {
        const data = await this.#questionModel.findAll({
            where: {
                quiz_id,
            }
        })

        if (!data.length) {
            return {
                error: true,
                message: "Questions not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Questions fetched successfully!",
            status: 200,
            data
        }
    }
}

export default new QuestionService()
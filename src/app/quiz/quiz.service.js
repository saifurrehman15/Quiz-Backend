import { sequelize } from "../../utils/db/index.js"
import { pagination } from "../../utils/db/pagination.js"
import SubjectModel from "../subjects/model/subject.model.js"
import UserModel from "../users/model/user.model.js"
import { QuestionsModel, QuizModel, QuizResult } from "./model/quiz.model.js"
import { Op } from 'sequelize'

class QuizService {
    #quizModel = QuizModel
    #questionModel = QuestionsModel
    #subjectModel = SubjectModel
    #resultModel = QuizResult

    constructor() {
        this.create = this.create.bind(this)
        this.show = this.show.bind(this)
        this.showOne = this.showOne.bind(this)
        this.update = this.update.bind(this)
        this.createResult = this.createResult.bind(this)
        this.showUserResult = this.showUserResult.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(value) {
        console.log(value);

        const findQuiz = await this.#quizModel.findOne({
            where: { quiz_name: value?.quiz?.quiz_name }
        })

        if (findQuiz) {
            return {
                error: true,
                message: "Quiz is already exists!",
                data: null,
                status: 403
            }
        }
        const quizObj = {
            ...value.quiz,
        }
        const created = await this.#quizModel.create(quizObj)

        if (!created) {
            return {
                error: true,
                message: "Failed to create quiz!",
                status: 403,
                data: null
            }
        }
        const plainObj = created.get({ plain: true })

        const questionsObj = value?.questions?.map(q => (
            {
                ...q,
                quiz_id: plainObj.id
            }
        ))

        await this.#questionModel.bulkCreate(questionsObj)


        return {
            error: false,
            message: "Quiz created successfully!",
            data: plainObj,
            status: 201
        }
    }

    async show(value) {
        const offset = (value.page - 1) * value.limit;
        console.log(offset, value.limit);

        const { rows, count } = await this.#quizModel.findAndCountAll({
            where: {
                quiz_name: {
                    [Op.like]: `%${value?.search}%`
                }
            },
            offset,
            limit: value?.limit,
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: this.#subjectModel,
                    as: 'subject',
                    attributes: ['id', 'name']
                }
            ]
        })

        if (!rows) {
            return {
                error: true,
                message: "Quiz not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Quiz fetched successfully!",
            status: 200,
            data: rows,
            pagination: { ...pagination({ count, limit: value?.limit, page: value?.page }) }
        }
    }

    async showOne(id) {
        console.log(QuizModel.associations, id);

        const found = await this.#quizModel.findOne({
            where: {
                id
            },
            include: {
                model: this.#questionModel,
                attributes: { exclude: ['created_at', 'updated_at'] }
            }
        })

        if (!found) {
            return {
                error: true,
                message: "Quiz not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Quiz fetched successfully!",
            status: 200,
            data: found,
        }
    }

    async update(value) {
        const transaction = await sequelize.transaction()
        let affectedVar;
        let affectedVar2;

        if (value.quiz) {
            const [affected] = await this.#quizModel.update(
                { ...value.quiz },
                { where: { id: value.id }, transaction },
            )
            affectedVar = affected
        }

        if (value.questions && value.questions.length) {
            value?.questions?.map(q => {
                if (q?.id) {
                    (async function () {
                        if (q?.destroy) {
                            await QuestionsModel.destroy(
                                { where: { id: q?.id } }
                            )
                        } else {
                            await QuestionsModel.update({ ...q },
                                { where: { id: q?.id } }
                            )
                        }
                    })()
                } else {
                    (async function () {
                        await QuestionsModel.create({ ...q, quiz_id: value?.id })
                    })()
                }
            })
        }

        if (!affectedVar) {
            transaction.rollback()
            return { error: true, message: "Quiz is not found!", status: 404 }
        }



        await transaction.commit()


        return {
            error: false,
            message: 'Quiz updated successfully!',
            status: 200,
            data: value
        }
    }

    async createResult(value) {
        const created = await this.#resultModel.create(value)

        if (!created) {
            return {
                error: true,
                message: "Failed to create result!",
                data: null,
                status: 403
            }
        }

        return {
            error: false,
            message: "Result created successfully!",
            status: 200,
            data: created,
        }
    }

    async showUserResult(value) {
        const offset = (value.page - 1) * value.limit;
        console.log(offset, value.limit);

        const { rows, count } = await this.#resultModel.findAndCountAll({
            where: { user_id: value?.id },
            offset,
            limit: value?.limit,
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: UserModel,
                    as: 'user',
                    attributes: ['id', 'first_name']
                },
                {
                    model: this.#quizModel,
                }
            ]
        })

        if (!rows) {
            return {
                error: true,
                message: "Result not found!",
                data: null,
                status: 404
            }
        }

        return {
            error: false,
            message: "Results fetched successfully!",
            status: 200,
            data: rows,
            pagination: { ...pagination({ count, limit: value?.limit, page: value?.page }) }
        }
    }

    async delete(id) {
        const result = await this.#quizModel.destroy({ where: { id } });

        if (!result) {
            return {
                error: true,
                message: 'Failed to delete quiz!',
                status: 403
            }
        }

        return {
            error: false,
            message: 'Quiz deleted successfully!',
            data: result
        }
    }
}

export default new QuizService()
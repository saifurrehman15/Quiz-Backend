import { responseSender } from "../../utils/helpers/response-sender.js";
import quizService from "./quiz.service.js";
import { quizValidate, quizValidateUpdate } from "./validations/index.js"

class QuizController {
    #quizService = quizService
    #validateQuiz = quizValidate
    #validateQuizUpdate = quizValidateUpdate

    constructor() {
        this.create = this.create.bind(this)
        this.show = this.show.bind(this)
        this.showOne = this.showOne.bind(this)
        this.update = this.update.bind(this)
        this.createResult = this.createResult.bind(this)
        this.showUserResult = this.showUserResult.bind(this)
        this.delete = this.delete.bind(this)
    }

    async create(req, res) {
        try {
            const { error, value } = this.#validateQuiz.validate(req.body);
            console.log(error, value);

            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null,
                    status: 400
                })
            }

            const result = await this.#quizService.create(value)

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
            const search = query.search || ''

            const result = await this.#quizService.show({ page, limit, search });

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

    async showOne(req, res) {
        try {
            const { params } = req
            console.log(params);

            const result = await this.#quizService.showOne(params?.id);

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

    async update(req, res) {
        try {
            const { id } = req.params
            const { error, value } = this.#validateQuizUpdate.validate(req.body)
            console.log(error);

            if (error) {
                return responseSender(res, 400, {
                    message: error.message,
                    data: null,
                    status: 400
                })
            }

            const result = await this.#quizService.update({ ...value, id })

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

    async createResult(req, res) {
        try {
            const { user } = req;
            const result = await this.#quizService.createResult({ user_id: user?.id, ...req.body })
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

    async showUserResult(req, res) {
        try {
            const { user } = req
            const { query } = req
            const page = Number(query?.page) || 1;
            const limit = Number(query?.limit) || 5;

            const result = await this.#quizService.showUserResult({ id: user?.id, page, limit })

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

    async delete(req, res) {
        try {
            const { id } = req.params

            const result = await this.#quizService.delete({ ...value, id })

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
            return responseSender(res, 500, {
                message: error || 'Internal Error Server!',
                data: null
            })
        }
    }
}

export default new QuizController()
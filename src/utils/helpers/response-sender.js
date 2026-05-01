export const responseSender = (res, status, data = {}) => {
    return res.status(status).json(data)
}
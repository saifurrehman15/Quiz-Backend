export const pagination = ({ count = 0, page = 1, limit = 5 }) => {
    return {
        total: count,
        page: Number(page),
        per_page: limit,
        total_pages: Math.ceil(count / limit) || 0
    }
}
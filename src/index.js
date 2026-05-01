import express from 'express'
import "dotenv/config"
import AUTHROUTE from "./routes/auth/auth.route.js"
import SUBJECTROUTE from "./routes/subjects/subject.route.js"
import QUIZROUTE from "./routes/quiz/quiz.route.js"
import USERROUTE from "./routes/users/user.route.js"

const app = express()
const port = process.env.port
const version = process.env.version

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World')
}
)

// ROUTES =>> API ROUSE BELOW
// 1) __AUTH ROUTES__
app.use(`/${version}/api`, AUTHROUTE)
// 2) __SUBJECT ROUTES__
app.use(`/${version}/api`, SUBJECTROUTE)
// 3) __QUIZ ROUTES__
app.use(`/${version}/api`, QUIZROUTE)
// 4) __USER ROUTES__
app.use(`/${version}/api`, USERROUTE)

app.listen(port, () => {
    console.log(`Example app listening on port ${port} version ${version}!`)
})
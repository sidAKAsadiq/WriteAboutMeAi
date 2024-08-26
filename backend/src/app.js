import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: "*", //for now, allowing from all sources
    credentials: true,
    methods : ["GET" , "POST"],
}))
app.use(express.json({limit : '16kb'})) //accept json data (forms)
app.use(express.urlencoded({extended : true , limit : '16kb'})) //Accept from URLs
app.use(cookieParser()) //To be able to manipulate cookies of user browser



//Routes
import user_router from "./routes/user.routes.js"

app.use('/api/v1/users' , user_router)

export {app}

import express from "express"
import 'express-async-errors'
import mongoose from "mongoose"
import { json } from 'body-parser';
import { currentUserRouter } from "./routes/currentUser"
import { signInRouter } from "./routes/signIn"
import { signOutRouter } from "./routes/signOut"
import { signUpRouter } from "./routes/signUp"
import { errorHandler, NotFoundError } from "@tickets-saferio/common"
import cookieSession from "cookie-session"

const app = express()
app.set('trust proxy',true)
app.use(json())
app.use(cookieSession({
  signed: false,
  secure: false,
}))
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)


app.all('*',async(req,res,next)=>{
  throw new NotFoundError()
  // next(new NotFoundError())
})
app.use(errorHandler)

export {app}
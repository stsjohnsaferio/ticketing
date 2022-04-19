// import { request } from "express";
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app"
import request from "supertest";
import { cookie } from "express-validator";


declare global {
  var signIn: () => Promise<string[]>;
}
let mongo:any;

beforeAll(async ()=>{
  process.env.JWT_KEY = "asdfrewds";
  mongo =await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri,
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }
  )
})

beforeEach(async ()=>{
  const collections = await mongoose.connection.db.collections();

  for(let collection of collections)
  {
    await collection.deleteMany({})
  }
})

// afterAll(async()=>{
//   await mongo.stop()
//   await mongoose.connection.close();
// }, 30000)

global.signIn =async () => {
  const email = "span@test.com"
  const password = "India@123"

  const res = await request(app)
  .post('/api/users/signUp')
  .send({
    email:email,
    password:password
  })
  .expect(201);

  const cookie = res.get("Set-Cookie")

  return cookie
}
// import { request } from "express";
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app"
import request from "supertest";
import { cookie } from "express-validator";
import jwt from "jsonwebtoken"


declare global { 
  var signin: () => string[];
}

jest.mock('../nats-wrapper');

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
  jest.clearAllMocks();
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

global.signin = () => {
  //Build a JWT payload {id, email}
  const payload = {
      id: '12uiu334ui',
      email: 'span@testing.com'
  }

  // Create a JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build Session Object { jwt: MY_JWT }
  const session = { jwt: token };

  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  //Take Json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //return cookie with encoded data
  return [`session=${base64}`];
}
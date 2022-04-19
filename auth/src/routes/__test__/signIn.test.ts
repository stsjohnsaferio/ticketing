import request from "supertest";
import { app } from "../../app";

it("Returns 201 on successfull login", async()=>{

  await request(app)
    .post('/api/users/signUp')
    .send({
      email:"span@test.com",
      password:"India@123"
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signIn')
    .send({
      email:"span@test.com",
      password:"India@123"
    })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined()
})

it("Returns 400 on Invalid credentials", async()=>{

  await request(app)
    .post('/api/users/signUp')
    .send({
      email:"span@test.com",
      password:"India@123"
    })
    .expect(201);

  return request(app)
    .post('/api/users/signIn')
    .send({
      email:"span@test.com",
      password:"I@123"
    })
    .expect(400);
})

it("Returns 400 on account does not exist", async()=>{

  return request(app)
  .post('/api/users/signIn')
  .send({
    email:"span@test.com",
    password:"I@123"
  })
  .expect(400);
})
import request from "supertest";
import { app } from "../../app";

it("Returns 201 on successfull signup", async()=>{
  return request(app)
  .post('/api/users/signUp')
  .send({
    email:"span@test.com",
    password:"India@123"
  })
  .expect(201);
})

it("returns a 400 with invalid email", async()=>{
  return request(app)
  .post('/api/users/signUp')
  .send({
    email:"span.test.com",
    password:"India@123"
  })
  .expect(400);
})

it("Returns 400 with invalid password", async()=>{
  return request(app)
  .post('/api/users/signUp')
  .send({
    email:"span@test.com",
    password:"p"
  })
  .expect(400);
})

it("Returns 400 with missing email and password", async()=>{
  await request(app)
  .post('/api/users/signUp')
  .send({email:"test.test.com"})
  .expect(400);

  await request(app)
  .post('/api/users/signUp')
  .send({password:"test@123"})
  .expect(400);
})

it("Disallows duplicate emails", async()=>{
  await request(app)
  .post('/api/users/signUp')
  .send({
    email:"span@test.com",
    password:"India@123"
  })
  .expect(201);

  await request(app)
  .post('/api/users/signUp')
  .send({
    email:"span@test.com",
    password:"India@123"
  })
  .expect(400);
})

it("Sets a cokkie on successfull signup", async()=>{
  const res = await request(app)
  .post('/api/users/signUp')
  .send({
    email:"span@test.com",
    password:"India@123"
  })
  .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined()

})
import request from "supertest";
import { app } from "../../app";

it("It clears the cokkie after signouut", async()=>{
  await request(app)
    .post('/api/users/signUp')
    .send({
      email:"span@test.com",
      password:"India@123"
    })
    .expect(201);

  await request(app)
    .post('/api/users/signIn')
    .send({
      email:"span@test.com",
      password:"India@123"
    })
    .expect(201);

  const res = await request(app)
    .post('/api/users/signOut')
    .send({})
    .expect(200);

  console.log(res.get("Set-Cookie"))
  expect(res.get("Set-Cookie")[0]).toEqual('session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
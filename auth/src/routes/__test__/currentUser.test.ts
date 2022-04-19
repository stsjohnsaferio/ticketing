import request from "supertest";
import { app } from "../../app";

it("response with details of current user",async()=>{

  const cokkie = await global.signIn();

  const res = await request(app)
    .get('/api/users/currentUser')
    .set("Cookie",cokkie)
    .send()
    .expect(200);


    expect(res.body.currentUser.email).toEqual("span@test.com")
})

it("response with null if not authenticated",async()=>{

  const res = await request(app)
    .get('/api/users/currentUser')
    .send()
    .expect(404);

    expect(res.body.currentUser).toEqual(undefined)
})
const app = require("../server"); // Link to your server file
const mongoose = require("mongoose");
const supertest = require("supertest");
const User = require("../models/User");
const request = supertest(app);

// describe("Testing the users API", () => {
//   it("tests our testing framework if it works", () => {
//     expect(2).toBe(2);
//   });

//   it("Gets the test endpoint", async (done) => {
//     // Sends GET Request to /test endpoint
//     const res = await request.get("/test");

//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe("pass!");
//     done();
//   });
// });

/**
 * 
beforeAll - called once before all tests.
beforeEach - called before each of these tests (before every test 
             function).
afterEach - called after each of these tests (after every test 
            function).
afterAll - called once after all tests.

 * Those are functions that will be invoked before and after every
 *  single test cases. This allows us to connect to MongoDB and 
 * remove all the data once a test case is finished
 */

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/contact_keeper",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("POST /api/users", async () => {
  const post = await Post.create({
    name: "user1",
    email: "user1@example.com",
    password: "123456",
  });

  await supertest(app)
    .post("/api/users")
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      // expect(response.body[0]._id).toBe(post.id);
      // expect(response.body[0].title).toBe(post.title);
      // expect(response.body[0].content).toBe(post.content);
    });
});

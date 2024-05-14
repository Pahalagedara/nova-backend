const request = require("supertest");

const express = require('express');
const bodyParser = require('body-parser');

const db = require("./src/models/index.models");

const app = express();
const port = 3000;
let server;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


beforeAll(async () => {
    //db connect
    await db.connect
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.log('MongoDB connection error:', err));

    //import routes
    require("./src/controllers/index.controllers")(app);

    server = app.listen(port,() => {
            console.log(`Start server on port -${port}`);
    })
}); 

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
});







describe("user route",() => {
    // it("Create user with new data | /user/create-user",() => {
    //     return request(app)
    //         .post('/user/create-user')
    //         .send({
    //             email:"thilinam4@gmaill.com",
    //             password: "123456",
    //             name: "Thilina Pahalagedara",
    //             type: "user"
    //         })
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     __v: expect.any(Number),
    //                     _id: expect.any(String),
    //                     email: expect.any(String),
    //                     name: expect.any(String),
    //                     type: expect.any(String),
    //                 }
    //             )
    //         });
    // })
    it("Create user with exist data | /user/create-user",() => {
        return request(app)
            .post('/user/create-user')
            .send({
                email:"thilinam4@gmaill.com",
                password: "123456",
                name: "Thilina Pahalagedara",
                type: "user"
            })
            .expect(400)
            .then((response)=>{
                expect(response.body)
            });
    })
    it("Create admin | /user/create-admin",() => {
        return request(app)
        .post('/user/create-admin')
        .send({
            email:"thilinam4@gmaill.com",
        })
        .expect(201)
        .then((response)=>{
            expect(response.body)
        });

    })
    it("Loging In | /user/loging",() => {

    })
})


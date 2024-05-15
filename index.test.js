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

//testing code

var userToken;
var adminToken;





describe("user route",() => {
    // it("Create user with new data | /user/create-user",() => {
    //     return request(app)
    //         .post('/user/create-user')
    //         .send({
    //             email:"tmpahalage@gmail.com",
    //             password: "123456",
    //             name: "Thilina Pahalagedara",
    //             type: "user"
    //         })
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     _id: expect.any(String),
    //                     email: expect.any(String),
    //                     name: expect.any(String),
    //                     type: expect.any(String),
    //                 }
    //             )
    //         });
    // })
    // it("Create user with exist data | /user/create-user",() => {
    //     return request(app)
    //         .post('/user/create-user')
    //         .send({
    //             email:"tmpahalage@gmail.com",
    //             password: "123456",
    //             name: "Thilina Pahalagedara",
    //             type: "user"
    //         })
    //         .expect(406)
    //         .then((response)=>{
    //             expect(response.body)
    //         });
    // })

    it("Login success | /user/login",() => {
        return request(app)
            .post('/user/login')
            .send({
                email:"tmpahalage@gmail.com",
                password: "123456",
            })
            .expect(200)
            .then((response)=>{
                expect(response.body.token)
                userToken = response.body.token;
            });
    })

    // it("Login failed from wrong password | /user/login",() => {
    //     return request(app)
    //         .post('/user/login')
    //         .send({
    //             email:"tmpahalage@gmail.com",
    //             password: "1234565",
    //         })
    //         .expect(401)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     message: expect.any(String)
    //                 }
    //             )
    //         });
    // })

    // it("Login failed from wrong email | /user/login",() => {
    //     return request(app)
    //         .post('/user/login')
    //         .send({
    //             email:"thilinam45@gmaill.com",
    //             password: "123456",
    //         })
    //         .expect(401)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     message: expect.any(String)
    //                 }
    //             )
    //         });
    // })

    // it("Create user with new data for admin purpose(should change the type in db) | /user/create-user",() => {
    //     return request(app)
    //         .post('/user/create-user')
    //         .send({
    //             email:"thilinam4@gmail.com",
    //             password: "12345869",
    //             name: "Thilina Pahalagedara",
    //             type: "user"
    //         })
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     _id: expect.any(String),
    //                     email: expect.any(String),
    //                     name: expect.any(String),
    //                     type: expect.any(String),
    //                 }
    //             )
    //         });
    // })

    it("Login as a admin | /user/login",() => {
        return request(app)
            .post('/user/login')
            .send({
                email:"thilinam4@gmail.com",
                password: "12345869",
            })
            .expect(200)
            .then((response)=>{
                expect(response.body.token)
                adminToken = response.body.token;
            });
    })

    // it("Create admin | /user/create-admin",() => {
    //     return request(app)
    //         .post('/user/create-admin')
    //         .set('Authorization', `bearer ${adminToken}`)
    //         .send({
    //             email:"tmpahalage@gmail.com",
    //         })
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body)
    //         });
    //     })

    
    // it("Create admin using exist admin user | /user/create-admin",() => {
    //     return request(app)
    //         .post('/user/create-admin')
    //         .set('Authorization', `bearer ${adminToken}`)
    //         .send({
    //             email:"tmpahalage@gmail.com",
    //         })
    //         .expect(406)
    //         .then((response)=>{
    //             expect(response.body)
    //         });
    //     })
        
    // it("delete user | /user/create-admin",() => {
    //     return request(app)
    //         .delete('/user/delete')
    //         .set('Authorization', `bearer ${adminToken}`)
    //         .expect(200)
    //         .then((response)=>{
    //             expect(response.body).toEqual(
    //                 {
    //                     message: "Your account has been deleted."
    //                 }
    //             )
    //         });
    //     })
            
})



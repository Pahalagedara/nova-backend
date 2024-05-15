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

var userToken; //auto changed
var adminToken; //auto changed
var bookId="664485fa7d962abee7106a32"; //auto changed
var borrowBookId="664485fa7d962abee7106a32"; //auto changed
var borrowId="6644ad8e91b3ed8a039a8c25";
var userId="66446cb00b376e5954d7f281";

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


describe("book route",() => {
    it("create book | /book/create",() => {
        return request(app)
            .post('/book/create')
            .set('Authorization', `bearer ${adminToken}`)
            .send({
                name: "rich dad poor dad", 
                totalCopies: 12, 
                availableCopies: 10})
            .expect(201)
            .then((response)=>{
                expect(response.body).toEqual(
                    {
                        message: "Book is added successfully.",
                        saveData: expect.any(Object)
                    }
                )
            });
    })

    it("create book unauthorized | /book/create",() => {
        return request(app)
            .post('/book/create')
            .set('Authorization', `bearer ${userToken}`)
            .send({name: "rich dad poor dad", totalCopies: "12", availableCopies: "10"})
            .expect(401)
            .then((response)=>{
                expect(response.body).toEqual(
                    {
                        error: 'Access denied.'
                    }
                )
            });
    })

    it("view all book with admint token | /book/all",() => {
        return request(app)
            .get('/book/all')
            .set('Authorization', `bearer ${adminToken}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    {bookList: expect.any(Array)}
                )
                //save the book id for test the </delete> endpoint
                bookId = response.body.bookList[0]._id;
                //save the book id for test the </borrow> endpoint
                borrowBookId = response.body.bookList[1]._id;
                
            });
    })

    it("view all book with user token | /book/all",() => {
        return request(app)
            .get('/book/all')
            .set('Authorization', `bearer ${userToken}`)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    {bookList: expect.any(Array)}
                )
            });
    })

    it("delete book | /book/delete",() => {
        return request(app)
            .delete(`/book/delete/${bookId}`)
            .set('Authorization', `bearer ${adminToken}`)
            .expect(200)
            .then((response)=>{
                expect(response.body).toEqual(
                    {
                        message: "Book is deleted successfully."
                    }
                )
            });
    })

    it("delete book does not exist | /book/delete",() => {
        return request(app)
            .delete(`/book/delete/${bookId}`)
            .set('Authorization', `bearer ${adminToken}`)
            .expect(400)
            .then((response)=>{
                expect(response.body).toEqual(
                    {
                        message: "The Book is already deleted."
                    }
                )
            });
    })

    it("delete book unauthorized | /book/delete",() => {
        return request(app)
            .delete(`/book/delete/${bookId}`)
            .set('Authorization', `bearer ${userToken}`)
            .expect(401)
            .then((response)=>{
                expect(response.body).toEqual(
                    {
                        error: 'Access denied.'
                    }
                )
            });
    })
})

describe("borrowings route",() => {
    it("Borrow Book | /borrow",() => {
        return request(app)
        .post("/borrow")
        .set('Authorization', `bearer ${userToken}`)
        .send({bookId: borrowBookId})
        .expect(200)
        .then(response=>{
            expect(response.body).toEqual(
                {
                    message: "Successfully borrowed the book.",
                    saveData: expect.any(Object)
                }
            )
        })
    })

    it("return Book | /borrow/return/:id",() => {
        return request(app)
        .put(`/borrow/return/${borrowId}`)
        .set('Authorization', `bearer ${adminToken}`)
        .expect(200)
        .then(response=>{
            expect(response.body).toEqual(
                {
                    message: "Accepted the returned book."
                }
            )
            
        })
    })

    it("View Self Borrowings | /borrow/my-borrowings",() => {
        return request(app)
        .get("/borrow/my-borrowings")
        .set('Authorization', `bearer ${userToken}`)
        .expect(200)
        .then(response=>{
            expect(response.body).toEqual(
                { 
                    borrowingList: expect.any(Array)
                }
            )
        })
    })

    it("View Borrowings by User | /borrow/all/${id}",() => {
        return request(app)
        .get(`/borrow/all/${userId}`)
        .set('Authorization', `bearer ${adminToken}`)
        .expect(200)
        .then(response=>{
            expect(response.body).toEqual(
                { 
                    borrowingList: expect.any(Array)
                }
            )
        })
    })
})
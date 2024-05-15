var router = require("express").Router();
var { ObjectId } = require('mongodb');
var roles = require("../../constants/roles.constant");
var {decodeJWT} = require("../../functions/jwt.functions");
var {checkPermission} = require("../../middlewares/auth.middlewares");
var {saveBorrowing,updateBorrowingReturned,findBorrowingByUser} = require("../../services/borrowing.services");
var {findBookDataById} = require("../../services/book.services");

router.post("",[checkPermission([roles.USER])],async(req,res)=>{
    let {bookId} = req.body;
    if (!bookId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    try{
        let book = await findBookDataById(bookId);
        if(!book){
            res.status(400).send({ message: "The selected book does not exist." });
            return; 
        }
        const decode = decodeJWT(req.headers.authorization.split(' ')[1]);
        const borrow = {
            user: {
                _id: decode._id,
                name: decode.name,
            },
            book: {
                _id: book._id, 
                name: book.name,
            },
            isReturned: false
        };
        const saveData = await saveBorrowing(borrow);
        res.status(200).send({ message: "Successfully borrowed the book.", saveData: saveData});
    }catch(err){
        console.log(err)
        res.status(400).send(`error - ${err}`);
    }
})

router.put("/return/:id",[checkPermission([roles.ADMIN])],async(req,res)=>{
    let {id} = req.params;
    try{
        const saveData = await updateBorrowingReturned(id);
        if(!saveData.acknowledged){
            res.status(400).send({ message: "Cannot accept the return."});
            return;
        }
        res.status(200).send({ message: "Accepted the returned book."});
    }catch(err){
        console.log(err)
        res.status(400).send(`error - ${err}`);
    }
})

router.get("/my-borrowings",[checkPermission([roles.USER])],async(req,res)=>{

    try{
        const decode = decodeJWT(req.headers.authorization.split(' ')[1]);
        const data = await findBorrowingByUser(decode._id);
        res.status(200).send({borrowingList: data});
    }catch(err){
        console.log(err)
        res.status(400).send(`error - ${err}`);
    }
})

router.get("/all/:id",[checkPermission([roles.ADMIN])],async(req,res)=>{

    let {id} = req.params;
    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try{
        const data = await findBorrowingByUser(id);
        if(!data){
            res.status(400).send({ message: "The user does not have any borrowings." });
            return;
        }
        res.status(200).send({borrowingList: data});
    }catch(err){
        console.log(err)
        res.status(400).send(`error - ${err}`);
    }
})

module.exports = router;
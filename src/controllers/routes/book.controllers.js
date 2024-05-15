var router = require("express").Router();
const roles = require("../../constants/roles.constant");
var {checkPermission} = require("../../middlewares/auth.middlewares");
var {saveBookData,findBookDataById,deleteBookData,getAllBooks} = require("../../services/book.services")


router.post("/create",[checkPermission([roles.ADMIN])],async(req,res)=>{

    let {name, totalCopies, availableCopies} = req.body;

    if (!name && !totalCopies && !availableCopies) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
   }

    try{
        const bookData = await saveBookData(name,totalCopies,availableCopies);
        res.status(201).send({ message: "Book is added successfully.",book: bookData});
    }catch(err){
        console.log(err)

        res.status(400).send(`error - ${err}`);
    }
})

router.delete("/delete/:id",[checkPermission([roles.ADMIN])],async(req,res)=>{

    let {id} = req.params;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    try{
        console.log(id);
        const book = await findBookDataById(id);

        if(!book){
            res.status(400).send({ message: "The Book is already deleted." });
            return;
        }

        await deleteBookData(book);
        res.status(200).send({ message: "Book is deleted successfully." });
    }catch(err){
        res.status(400).send(`error - ${err}`);
    }
})

router.get("/all",async(req,res)=>{
    try{
        const bookList = await getAllBooks();
        res.status(200).send({bookList: bookList});
    }catch(err){
        res.status(400).send(`error - ${err}`);
    }
})


module.exports = router;
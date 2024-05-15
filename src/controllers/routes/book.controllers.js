var router = require("express").Router();
var {checkPermission} = require("../../middlewares/auth.middlewares");
const roles = require("../../constants/roles.constant");


router.post("/create",[checkPermission([roles.ADMIN])],async(req,res)=>{
    try{
        res.status(201).send({ message: "Book is added successfully."});
    }catch(err){
        res.status(400).send(`error - ${err}`);
    }
})

router.delete("/delete",[checkPermission([roles.ADMIN])],async(req,res)=>{
    try{
        res.status(200).send({ message: "Book is deleted successfully." });
    }catch(err){
        res.status(400).send(`error - ${err}`);
    }
})

router.get("/all",async(req,res)=>{
    try{
        res.status(200).send([]);
    }catch(err){
        res.status(400).send(`error - ${err}`);
    }
})


module.exports = router;
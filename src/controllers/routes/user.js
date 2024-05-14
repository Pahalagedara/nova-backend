var router = require("express").Router();

var {createUser} = require("../../services/user");

router.get("/create",async(req,res) => {
        try{
             const data = await createUser('thilina pah','sds225');
             console.log(data);
             res.send(data).status(201);
        }
        catch(err){
             res.send(`error - ${err}`).status(400);
        }
})

module.exports = router;


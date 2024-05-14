var router = require("express").Router();

var {saveUserData,findByEmail,updateUserToAdmin} = require("../../services/user.services");
var {saveAuthData} = require("../../services/auth.services")

router.post("/create-user",async(req,res) => {

     let {email,password,name,type} = req.body;

     // Validate request
     if (!email && !password && !name && !type) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
     }

     try{
          const authData = await saveAuthData(email,password);
          const userData = await saveUserData(authData._id,name,type);
          res.status(201).send(userData);
     }
     catch(err){
          res.status(400).send(`error - ${err}`);
     }
})

router.post("/create-admin",async(req,res) => {

     let {email} = req.body;


    // Check if an admin account already exists
    const existingUser = await findByEmail(email);

    if (!existingUser){
     res.status(406).send({ message: "Can not find the user" });
     return;
    }

    if (existingUser.type=='admin') {
     res.status(406).send({ message: "This user is already admin" });
     return;
    }

     try{
          await updateUserToAdmin(existingUser._id);
          res.status(201).send({message: `Updated ${email} to admin role`});
     }
     catch(err){
          res.status(400).send(`error - ${err}`);
     }
})


router.delete("/delete",async(req,res) => {

     let {email,password,name,type} = req.body;

     // Validate request
     if (!email && !password && !name && !type) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
     }

     try{
          // const authData = await saveAuthData(email,password);
          // const userData = await saveUserData(authData._id,name,type);
          const response = {
               _id: "",
               email: "",
               name: "",
               type: "",
          }
          res.status(201).json({response});
     }
     catch(err){
          res.status(400).send(`error - ${err}`);
     }
})

module.exports = router;


var router = require("express").Router();
var {encodeJWT,decodeJWT} = require("../../functions/jwt.functions");
var {passwordCompare, hashPassword} = require("../../functions/common.functions");
var roles = require("../../constants/roles.constant");
var {saveUserData,findUserDataByEmail,updateUserToAdmin,deleteUserData} = require("../../services/user.services");
var {saveAuthData,findAuthDataByEmail,deleteAuthData} = require("../../services/auth.services");
var {checkPermission} = require("../../middlewares/auth.middlewares");

router.post("/create-user",async(req,res) => {

     let {email,password,name,type} = req.body;
     // Validate request
     if (!email && !password && !name && !type) {
          res.status(400).send({ message: "Content can not be empty!" });
          return;
     }

     if(type==roles.USER){
          try{

               // Check if an admin account already exists
               const existingUser = await findUserDataByEmail(email);

               if (existingUser){
                    res.status(406).send({ message: "It looks like you already have an account with us. Please log in." });
                    return;
               }

               const hashcode = await hashPassword(password); 
               const authData = await saveAuthData(email,hashcode);
               const userData = await saveUserData(authData._id,name,type);
               const response = {
                    _id: userData._id,
                    email: userData.authId,
                    name: userData.name,
                    type: userData.type,
               }
               res.status(201).send(response);
          }
          catch(err){
               res.status(400).send(`error - ${err}`);
          }
     }else{
          res.status(400).send(`error - ${err}`);
     }
})

router.post("/create-admin",[checkPermission([roles.ADMIN])],async(req,res) => {

     let {email} = req.body;

    // Check if an admin account already exists
    const existingUser = await findUserDataByEmail(email);

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


router.delete("/delete",[checkPermission([roles.ADMIN,roles.USER])],async(req,res) => {

     try{
          const token = req.headers.authorization.split(' ')[1];
          const decode = decodeJWT(token);
          const authData = await findAuthDataByEmail(decode.email);
          const userData = await findUserDataByEmail(decode.email);
          await deleteUserData(userData);
          await deleteAuthData(authData);
          res.status(200).send({ message: "Your account has been deleted."});
     }
     catch(err){
          console.log(err)
          res.status(400).send(`error - ${err}`);
     }
})

router.post("/login",async(req,res) => {

     let {email,password} = req.body;

     try{
         const authData = await findAuthDataByEmail(email);
         if(!authData){
               res.status(401).send({message: "Wrong username or password"});
               return;
         }

         const isUserValid = await passwordCompare(password,authData.password);
         if(isUserValid){
               const userData = await findUserDataByEmail(email);
               const tokenData = {
                    _id: userData._id,
                    email: userData.authId,
                    name: userData.name,
                    type: userData.type,
               };
               const token = encodeJWT(tokenData);
               res.status(200).send({message: "login success",token: token});
         }else{
               res.status(401).send({message: "Wrong username or password"});
         }
     }
     catch(err){
          res.status(400).send(`error - ${err}`);
     }
})

module.exports = router;


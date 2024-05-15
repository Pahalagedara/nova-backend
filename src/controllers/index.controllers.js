module.exports = app => {
    var router = require("express").Router();

    //routes    
    router.use("/user",require('./routes/user.controllers'));
    router.use("/book",require('./routes/book.controllers'));
    router.use("/borrow",require('./routes/borrowing.controllers'));


    app.use("",router);
}

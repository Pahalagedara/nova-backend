const {checkPermission, logger} = require("../middleware/auth");


module.exports = app => {
    var router = require("express").Router();

    //routes
    router.use("/user",[logger(),checkPermission(['admin','user'])],require('./routes/user'));

    app.use("",router);
}

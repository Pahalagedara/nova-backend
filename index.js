const express = require('express');
const bodyParser = require('body-parser');

const db = require("./src/models/index.models");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//db connect
db.connect
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

//import routes
require("./src/controllers/index.controllers")(app);

app.listen(port,() => {
        console.log(`Start server on port -${port}`);
})

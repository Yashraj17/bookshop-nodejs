const express = require('express')
const bodyParser = require('body-parser');
const router = require('./Routes/web')
const conn = require('./Database/connection')
const session =require('express-session')
const multer = require('multer');
var path = require("path");
const app = express();


//setting session
app.use(session({
        secret: 'yashraj1720000',
        resave: false,
        saveUninitialized: true,
}))

const urlEncoded = bodyParser.urlencoded({extended:false});
app.use(urlEncoded)
app.use(express.static('./images'))

app.use('/',router);

app.set('view engine','pug')
app.set('views','./views')

app.listen(8081);
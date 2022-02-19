const express = require('express');
const router = express.Router();
const BookController = require('../Controllers/bookController');
const productController = require('../Controllers/productController');
const upload = require('../Middleware/upload')

router.get('/',BookController.home);

router.get('/login',BookController.viewLogin);
router.post('/login',BookController.loginUser);

router.get('/signup',BookController.viewSignup);
router.post('/signup',BookController.signupUser);

router.get('/logout',BookController.logout);

router.get('/insert',productController.insertPage)
router.post('/insert',upload.single('image'),productController.productInsert)

router.get('/View/:id',productController.viewProduct);
module.exports = router
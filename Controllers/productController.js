const productModel = require('../Model/product');

class productController{
    static insertPage = (req,res)=>{
        if (!req.session.name) {
            res.redirect('/login');
        }
        else{
            res.render('insert')
        }
    }
    static productInsert =async (req,res)=>{
        
        try {
            var productCollection = new productModel({
                title:req.body.title,
                author:req.body.author,
                category:req.body.category,
                category:req.body.category,
                image:req.file.filename,
                price:req.body.price,
            })
            await productCollection.save();
            console.log(req.file.filename);
            console.log('product data inserted successfully');
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    }
    static viewProduct = async (req,res)=>{
        var product_id = req.params.id;
        try {
            const results = await productModel.findOne({"_id":product_id});
            console.log('view fetch successfull');
                console.log(results.image);
                res.render("view",{data:results});
        } catch (error) {
            console.log('data not fetch');
        }

    }
}
module.exports = productController;
const userModel = require('../Model/user')
const productModel = require('../Model/product')
const bcrypt  = require('bcrypt')
class BookController{

    static home = (req,res)=>{
        if (!req.session.name) {
            res.redirect('/login');
        }
        else{
            productModel.find({},function (error,results) {
                if (error) {
                    throw error
                }
                else{
                    res.render('home',{data:results});
                }
                
            })
            
        }
        
    }

    static viewLogin=(req,res)=>{
        res.render('login');
    }
    static viewSignup=(req,res)=>{
        res.render('signup')
    }
    static signupUser=async (req,res)=>{
        const hashPassword = await bcrypt.hash(req.body.password,10);
      try {
          const userCollection = new userModel({
              name:req.body.name,
              email:req.body.email,
              password:hashPassword,
          })
          await userCollection.save();
          console.log('data inserted');
          res.redirect('/login');
      } catch (error) {
          console.log("data not inserted");
      }
    }
    static loginUser = async (req,res)=>{
        try {
            const {email,password} = req.body;
            const result = await userModel.findOne({email:email})
            if (result != null) {
                const isMatch = await bcrypt.compare(password,result.password);
                if (result.email==email && isMatch) {
                    req.session.name = result.email;
                    console.log(req.session.name);
                    res.redirect("/")
                }
                else{
                    res.send('invaild email or password')
                }
            }
            else{
                res.send("you are not a registered member")
            }
        } catch (error) {
            console.log(error);
        }
    }

    static logout = (req,res)=>{
        req.session.destroy(function (error) {
            if (error) {
                console.log("session not deleted");
            }
            else{
                res.redirect('/login');
            }
        })
    }

}
module.exports = BookController
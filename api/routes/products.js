const express = require('express')
const router = express.Router();
const request = require('request');
const ajax = require('ajax');
const axios = require('axios');
const merge = require('merge');
const absorb = require('absorb');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');
const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/test"

//GET
router.get('/getall', ProductsController.products_get_all);
router.get('/:id',ProductsController.products_find_id);
router.get('/',(req , res , next) =>{
    res.status(200).json({
        message : 'Get Product /'
    });

});
router.get('/one',(req , res , next) =>{
    res.status(200).json({
        message : 'Get Product /one'
    });

});

//POST
router.post('/add', ProductsController.products_add);
router.post('/column',ProductsController.products_find_columns);
router.post('/row',ProductsController.products_find_rows);

router.post('/we',function (req,res) {
    const data = {name : "nut tharin 1"};
    MongoClient.connect(url,function (err , db){
        db.collection('test').insertOne(data,(err ,result)=>{
            if(err) throw err ;

        });
    });
   
    res.json(data);
});

router.post('/',(req , res , next) =>{
    const Product = {
        name: req.body.name,
        price: req.body.price
    };
    console.log(req.body);
    res.status(200).json({
        message : 'Post Product /Product',
        createdProduct: Product
    });

});
router.post('/login',(req , res , next) =>{
        MongoClient.connect(url,function (err , db){
            db.collection('test').find({email:req.body.email})
            .exec()
            .then(Product=>
                {
                    if(Product.length < 1)
                    {
                        return res.status(401).json({
                            message:'Auth failed'
                        });
                    }
                    bcrypt.compare(req.body.password,Product[0].password,(err,result))
                    if(err)
                    {
                        return res.status(404).json({
                            message:'Auth failed'
                        });
                    }
                    if(result)
                    {
                        const token =jwt.sign(
                        {
                            email:user[0].email,
                            userID:user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn:"1h"
                        }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
                    }
                })
            .cathch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
        });
        /*res.status(200).json({
            message : 'Get Column /: = '+id
        });*/
    db.close    
    });
});

module.exports = router;
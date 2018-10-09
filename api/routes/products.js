const express = require('express')
const router = express.Router()
const request = require('request');
const ajax = require('ajax');
const axios = require('axios');


const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/test"

router.get('/getall',(req , res , next) =>{
    MongoClient.connect(url,function(err,db){
        db.collection("test")
        .find({})
        .toArray(function(err ,result)
        {
            if(err) throw err ;
            /*const output =
            {
                status:"OK",
                message  : result
            }*/
            res.json({
                message : result
            });
            console.log(result);
            //res.json(output);
             db.close();
        });
         
       
    });

});
//GET

//POST
router.post('/we',function (req,res) {
    const data = {name : "nut tharin 1"};
    MongoClient.connect(url,function (err , db){
        db.collection('test').insertOne(data,(err ,result)=>{
            if(err) throw err ;

        });
    });
   
    res.json(data);
});

router.post('/add',function(req , res){
    var temp ;
    /*Request({
        method:"GET",
        url:"http://data.tmd.go.th/api/Weather3Hours/V1/?type=json";
        json : true
    },function(err,response)*/
    /*request('http://data.tmd.go.th/api/Weather3Hours/V1/?type=json',
    {   json:true   },
    (err , res , body)=>{
        if(err) throw err;
       temp = body;        

    });
    res.json(temp);
    res.send("ssss");*/
    
    axios.get('http://data.tmd.go.th/api/Weather3Hours/V1/?type=json' , { responseType: 'json' })
    .then(response => {
        /*temp = JSON.parse(response.data);*/
        //temp = JSON.stringify(response);
        temp = response.data ;
        
        //console.log(temp.data.t);
        //console.log(temp.Stations[0]);
        data = temp.Stations ; 
        console.log(data.length);
        MongoClient.connect(url,function (err , db){
            for(var i = 0 ;i <data.length ; i++)
            {
                db.collection('test').insertOne(data[i],(err ,result)=>{
                    if(err) throw err ;
                    
                });
            }
        db.close    
        });
        
        
        //return temp ;
        /*MongoClient.connect(url,function (err , db){
            db.collection('test').insertOne(data,(err ,result)=>{
                if(err) throw err ;
    
            });
        });*/

      })
    .catch(error => {
        console.log(error);
      });
      
    
    res.end("complete1");
    
    
   
});

router.get('/',(req , res , next) =>{
    res.status(200).json({
        message : 'Get Product /'
    });

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

router.get('/one',(req , res , next) =>{
    res.status(200).json({
        message : 'Get Product /one'
    });

});

router.get('/:ProId',(req , res , next) =>{
    const id = req.params.ProId;
    res.status(200).json({
        message : 'Get Product /:ProId = '+id
    });

});



module.exports = router;
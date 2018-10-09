const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ProductRoutes = require('./api/routes/products');


/*app.use(( req, res, next ) => {
    res.status(200).json({
        message : 'It work'
    });
});*/
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false})); // false ใช้อัลกอในการ map json ธรรมดา ,true = high
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept,Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next(); // ไปต่อ
})

app.use('/product',ProductRoutes);  // path /product/..

app.get('/',(req , res , next) =>{  // path /
    res.status(200).json({
        message : 'Get root /'
    });

});
module.exports = app;


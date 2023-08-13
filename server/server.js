const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');

const router = require('./routes/route_customers');

//DB config...
const db = require('./db/db');


//middlewares...
app.use(express.json());
app.use(cors());
app.use(router);





app.listen(process.env.PORT ,()=>{
    console.log('Server is Running...')
})
require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express()
const uri = "mongodb+srv://clusterservice:clusterservice123@cluster0.ys4i2.mongodb.net/secretserver?retryWrites=true&w=majority";
let port = process.env.PORT || 3000
const secretserverRoutes = require('./routes/sercretserver');
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();   
});
app.use(cors({origin: "*"}))

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true})
.then(() => {
    console.log('connection successfully')
}).catch((err) => console.log(err))


app.use('/v1/secret', secretserverRoutes)


app.listen(port, () => console.log('server started'))
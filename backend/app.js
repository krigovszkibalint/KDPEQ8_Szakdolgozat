const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// IMPORT ROUTES
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const jobTypeRoutes = require('./routes/jobsTypeRoutes');
const jobRoute = require('./routes/jobsRoutes');

// DB CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(()=>console.log("DB csatlakozás sikeres"))
.catch((err)=>console.log(err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// ROUTES MIDDLEWARE
//app.get('/', (req, res)=>{
//    res.send("hello");
//});

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobRoute);

// ERROR MIDDLEWARE
app.use(errorHandler);

// PORT
const port = process.env.PORT || 9000

app.listen(port, ()=>{
    console.log(`Szerver elindult, PORT: ${port}`);
});
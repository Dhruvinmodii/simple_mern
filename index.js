const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//MongoDB
mongoose.connect("mongodb://localhost:27017/temptemp123",{
    useNewUrlParser:true,
})
.then((res) => console.log('Connected..'))
.catch((err) => console.log(err));

//Route File
const bootcamp = require('./Route/bootcamp');

const app = express();
app.use(express.json());
const port = 4444;

//Mount File
app.use('/api/v2/bootcamp',bootcamp);

//server config
app.listen(port,console.log(`server is running on port ${port}`))


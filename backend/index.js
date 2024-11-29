const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiv1 = express();
const userRouter = require('./routes/users');
const empRouter = require('./routes/employees');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true})); 
app.use(cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    allowedHeaders: ['Content-Type']
}));

apiv1.use('/user', userRouter);
apiv1.use('/emp', empRouter);
app.use('/api/v1', apiv1)

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@localhost:27017/comp3123?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err);
});

//http://localhost:3000/
app.route('/').get((req, res) => {
    res.send("Nothing here");
});

// Listen to server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})
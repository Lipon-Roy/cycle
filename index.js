const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { notFoundHandler, errorHandler } = require('./middlewares/common/errorHandler');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
dotenv.config();

// database connection
mongoose.connect(process.env.DB_URL_STRING)
    .then(() => console.log('Database connection successfull'))
    .catch(err => console.log(err));

// request parser
app.use(express.json());

// routing setup
app.get("/", (req, res) => {
    res.status(200).json({
        message: 'Hello By cycle rider'
    });
});


app.use('/user', userRouter);

// 404 not found handler
app.use(notFoundHandler)

// common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
});
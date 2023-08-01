const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const {notFound , errorHandler} = require('./middleware/errorMiddleware');
connectDB();
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send("this api is running");

})

app.use('/api/user', userRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server is running on this ${port}`));
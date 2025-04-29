// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require("dotenv").config();
 

const simpleApiRoute = require('./routes/simpleApiRoute')
const itemsRouter = require("./routes/itemsRoute")
const productRouter = require("./routes/productRoute")
const userRouter = require("./routes/userRoute")



const app = express();
app.use(bodyParser.json());
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI; // Update as needed
mongoose.connect(MONGO_URI,  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));




app.use('/api/simpleApi',simpleApiRoute)
app.use("/api/items",itemsRouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)


 
if (process.env.NODE_ENV !== 'test') {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}



module.exports = app

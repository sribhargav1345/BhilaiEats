
const express = require('express')
const app = express()
const port = 5000

const mongoDB = require("./db")


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

mongoDB();

app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/CreateAdmin"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/DisplayCanteen"));
app.use('/api', require("./Routes/ShopData/TechCafe"));
app.use('/api', require("./Routes/ShopData/ATMart"));
app.use('/api', require("./Routes/ShopData/Bakery"));
app.use('/api', require("./Routes/ShopData/MilkShakes"));
app.use('/api', require("./Routes/ShopData/Dairy"));
app.use('/api', require("./Routes/ShopData/Govasta"));
app.use('/api', require("./Routes/ShopData/CafeCoffee"));
app.use('/api', require("./Routes/ShopData/NJX"));
app.use('/api', require("./Routes/ShopData/Galav"));

app.use('/api', require("./Routes/Owners"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// How to connect mongodb with express? -> Isn't it interesting

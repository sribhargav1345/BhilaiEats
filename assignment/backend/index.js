
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

// Shop_Owner Part
app.use('/api', require("./Routes/Shop_Owner/CreateAdmin"));
app.use('/api', require("./Routes/Shop_Owner/DisplayData"));

// User part
app.use('/api', require("./Routes/User/CreateUser"));
app.use('/api', require("./Routes/User/DisplayData"));
app.use('/api', require("./Routes/User/OrderData"));
app.use('/api', require("./Routes/User/DisplayCanteen"));

// Super_Admin part
app.use('/api', require("./Routes/Super_Admin/ShopData/TechCafe"));
app.use('/api', require("./Routes/Super_Admin/ShopData/ATMart"));
app.use('/api', require("./Routes/Super_Admin/ShopData/Bakery"));
app.use('/api', require("./Routes/Super_Admin/ShopData/MilkShakes"));
app.use('/api', require("./Routes/Super_Admin/ShopData/Dairy"));
app.use('/api', require("./Routes/Super_Admin/ShopData/Govasta"));
app.use('/api', require("./Routes/Super_Admin/ShopData/CafeCoffee"));
app.use('/api', require("./Routes/Super_Admin/ShopData/NJX"));
app.use('/api', require("./Routes/Super_Admin/ShopData/Galav"));

app.use('/api', require("./Routes/Super_Admin/Owners"));
app.use('/api', require("./Routes/Super_Admin/CreateSuperAdmin"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// How to connect mongodb with express? -> Isn't it interesting

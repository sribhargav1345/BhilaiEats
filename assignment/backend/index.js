const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

const mongoDB = require("./db")
app.use(cors());

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
  res.redirect('/user');
});

app.get('/user', (req, res) => {
  res.send('Hello World!');
});

mongoDB();

// Shop_Owner Part
app.use('/api', require("./Routes/Shop_Owner/CreateAdmin"));
app.use('/api', require("./Routes/Shop_Owner/DisplayFoodData"));

app.use('/api', require("./Routes/Shop_Owner/Milkshakes/Create_Food"));
app.use('/api', require("./Routes/Shop_Owner/Milkshakes/View_Food"));
app.use('/api', require("./Routes/Shop_Owner/CreateAdmin"));

app.use('/api', require("./Routes/Shop_Owner/DisplayFoodsActoShop"));              // Working on it and main part


// User part
app.use('/api', require("./Routes/User/CreateUser"));
app.use('/api', require("./Routes/User/DisplayData"));
app.use('/api', require("./Routes/User/OrderData"));
app.use('/api', require("./Routes/User/GetUserProfile"));
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
app.use('/api', require("./Routes/Super_Admin/CreateShops"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// How to connect mongodb with express? -> Isn't it interesting

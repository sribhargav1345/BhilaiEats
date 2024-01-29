
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
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));
app.use('/api', require("./Routes/DisplayCanteen"));
app.use('/api', require("./Routes/TechCafe"));
app.use('/api', require("./Routes/ATMart"));
app.use('/api', require("./Routes/Bakery"));
app.use('/api', require("./Routes/MilkShakes"));
app.use('/api', require("./Routes/Dairy"));
app.use('/api', require("./Routes/Govasta"));
app.use('/api', require("./Routes/CafeCoffee"));
app.use('/api', require("./Routes/NJX"));
app.use('/api', require("./Routes/Galav"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// How to connect mongodb with express? -> Isn't it interesting

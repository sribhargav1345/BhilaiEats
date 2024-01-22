const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sribhargav1345:Assignment@cluster0.a01uyjm.mongodb.net/Assignment?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    const fetched_data = await mongoose.connection.db.collection("foods");
    //console.log(1);

    const fetchedData = await mongoose.connection.db.collection("foods").find({}).toArray();        // If using mongoose, follow this type -> spent 1 hr to debug.
    //console.log('Fetched data:', fetchedData);

    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    foodCategory.find({}).toArray(function (err,catData){
      if(err) console.log(err);
      else
      {
        global.foods = fetchedData;
        global.foodCategory = catData;
      }
    })
    //global.foods = fetchedData;
    // console.log(global.foods);


  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = mongoDB;

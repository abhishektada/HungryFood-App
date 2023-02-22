const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// const mongoURI =
//   "mongodb+srv://hungryfood:TADA1212tada@cluster0.xqun4x7.mongodb.net/hungryFood?retryWrites=true&w=majority";
const mongoURI =
  "mongodb://hungryfood:TADA1212tada@ac-hvqp0cr-shard-00-00.xqun4x7.mongodb.net:27017,ac-hvqp0cr-shard-00-01.xqun4x7.mongodb.net:27017,ac-hvqp0cr-shard-00-02.xqun4x7.mongodb.net:27017/hungryFood?ssl=true&replicaSet=atlas-r4esuv-shard-0&authSource=admin&retryWrites=true&w=majority";

const mongoDB = async () => {
  mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    async (err, result) => {
      if (err) {
        console.log("Error ", err);
      } else {
        console.log("BD connected");
        const foodItemColl = mongoose.connection.db.collection("food_item");
        foodItemColl.find({}).toArray(async (err1, data) => {
          const foodCategoryColl =
            mongoose.connection.db.collection("food_category");
          foodCategoryColl.find({}).toArray((err2, catData) => {
            if (err1 || err2) {
              console.log("Error1 ", err1);
              console.log("Error2", err2);
            } else {
              global.foodItem = data;
              global.foodCatagory = catData;
            }
          });
        });
      }
    }
  );
};

module.exports = mongoDB;

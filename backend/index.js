const express = require('express');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const cors = require('cors');
// const { ObjectId } = require('mongodb');


dotenv.config();
// console.log(process.env.MONGO_URI);

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'myPasswordManager';

const app = express();
const port = 3000;
app.use(bodyparser.json());

// app.use(cors());

app.use(cors({
  origin: 'https://passwordmanager-q7u5f7uxx-sayan-kumar-dass-projects.vercel.app'
}));


client.connect();


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success: true, result: findResult});
});

app.delete('/', async (req, res) => {
  const { id } = req.body; 
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  try {
    const deleteResult = await collection.deleteOne({ id }); 
    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No document found with this id' });
    }
    res.json({ success: true, deletedCount: deleteResult.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});




app.listen(port,'0.0.0.0', () => {
    console.log(`Express app listening at http://localhost:${port}`);
});


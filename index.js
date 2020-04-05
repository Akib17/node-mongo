const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
app.use(cors())
app.use(bodyParser.json())

const uri = process.env.uri
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/products', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("OnlineStore").collection("products");
        collection.find().toArray((error, documents) => {
            if (error) {
                console.log(error)
            } else {
                res.send(documents)
            }
        });
        client.close();
    });
})


app.post('/addProduct', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    const product = req.body
    console.log(product)
    client.connect(err => {
        const collection = client.db("OnlineStore").collection("products");
        collection.insertOne(product, (error, result) => {
            if (error) {
                console.log(err)
            } else {
                res.send(result.ops[0])
                console.log('Connection successful...', result)
            }
        });
        client.close();
    });
})

app.listen(3000, () => console.log('App is listening from 3000'))
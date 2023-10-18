
const express=require("express")
const cors=require("cors")
const port=process.env.PORT||3000
const app=express()

// middleware
app.use(cors())
app.use(express.json())

// username and password
// luxury-car
// tQpzf4pshYrTDdip


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://luxury-car:tQpzf4pshYrTDdip@cluster0.kndeci6.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const productCollection=client.db("productDB").collection("product")

    // create
    app.post('/product',async(req,res)=>{
        const newProduct=req.body 
        console.log(newProduct);
        const result=await productCollection.insertOne(newProduct)
        res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Luxury Car server is running...')
})

app.listen(port,(req,res)=>{
    console.log(`port${port}`)
})
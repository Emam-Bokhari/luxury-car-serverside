
const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 3000
const app = express()

// middleware
app.use(cors())
app.use(express.json())

// username and password
// luxury-car
// tQpzf4pshYrTDdip


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

    const productCollection = client.db("productDB").collection("product")
    
    const cartCollection=client.db("cartsDB").collection("cart")

    // read
    app.get('/products', async (req, res) => {
      const cursor = productCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/products/:id',async(req,res)=>{
      const id=req.params.id 
      // console.log(id);
      const query={_id:new ObjectId(id)}
      const result=await productCollection.findOne(query)
      res.send(result)
      console.log(result);
    })

    // create
    app.post('/productsData', async (req, res) => {
      const newProduct = req.body
      const result = await productCollection.insertOne(newProduct)
      res.send(result)
    })


    // update
    app.put('/productsData/:id',async(req,res)=>{
      const id=req.params.id 
      console.log(id);
      const query={_id:new ObjectId(id)}
      const updateProduct=req.body 
      console.log(updateProduct);
      const product={
        $set:{
          name:updateProduct.name,
          brandName:updateProduct.brandName,
          type:updateProduct.type,
          rating:updateProduct.rating,
          price:updateProduct.price,
          photoURL:updateProduct.photoURL,
          productDescription:updateProduct.productDescription
        }
      }
      const result=await productCollection.updateOne(query,product)
      res.send(result)
    })


    // read
    app.get('/cart',async(req,res)=>{
      const cursor=cartCollection.find()
      const result=await cursor.toArray()
      res.send(result)
    })

    

    // create
    app.post('/cart',async(req,res)=>{
      const newCart=req.body
      const result=await cartCollection.insertOne(newCart)
      res.send(result)
    })

   
    
    // delete
    app.delete('/cart/:id',async(req,res)=>{
      const id=req.params.id 
      console.log(id);
      const query={_id:new ObjectId(id)}
      const result=await cartCollection.deleteOne(query)
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


app.get('/', (req, res) => {
  res.send('Luxury Car server is running...')
})

app.listen(port, (req, res) => {
  console.log(`port${port}`)
})
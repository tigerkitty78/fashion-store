//const cors = require('cors');
//app.use(cors()); 

const express = require("express")
const router = express.Router();
const Item= require('../models/item');
const Review = require("../models/review");

console.log('Stock model imported:', Item);


//route to get all items
router.get("/getallitems",async(req,res)=>{
try{
    const stocks = await Item.find({});
    console.log("sending items");
    console.log("Items fetched from DB:", stocks);
    res.json(stocks);
    //res.status(200).json(stocks); // Send items as a JSON response    
}
catch (error)
{
    return res.status(400).json({message:error});   
}
});
module.exports = router;


router.post("/postitem", async (req, res) => {
  console.log("noooooooo");
  const { name, prices, variants,description,targetmarket,category,collection } = req.body; // Adjust based on your item schema
  try {
    
    const newItem = new Item({
      name,
            prices,
            description,
            variants,
            targetmarket,
            category,
            collection
    });
    // Save the item to the database
    await newItem.save();
    console.log("New item saved to DB:", newItem);
    // Send the saved item as a response
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error});
  }
});

module.exports = router;




//search route
router.get('/search-results', async (req, res) => {
    try {
        const { category } = req.query; // Read query param from the request
        console.log("search")
        // Find items matching the category (case-insensitive)
        const categories = await Item.find({
            category: { $regex: category, $options: 'i' }
            
        }).distinct('category');
        console.log("search items",categories)
        res.json(categories);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;




//sort products by collection
router.get('/collection', async(req,res)=>{

  try {
      const collectionNames = await Item.distinct("collection");
  // Map to extract the collection names
 // const collectionNames = collections.map(collection => collection.name);

  // Check if there are any collections
  if (collectionNames.length === 0) {
    return res.status(404).send("No collections found.");
  } else {
    return res.status(200).json(collectionNames); // Send the list of collection names
  }
} catch (error) {
  console.error("Error retrieving collection names:", error);
  return res.status(500).send("Server Error");
}
});
module.exports = router;




 //get items collection wise   
    router.get('/collection/:name', async (req, res) => {
        const collectionName = req.params.name;
      
        try {
          const items = await Item.find({ collection: collectionName });
          if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this collection' });
          }
          res.status(200).json({ items });
        } catch (error) {
          console.error('Error fetching items for collection:', error);
          res.status(500).json({ message: 'Error fetching items' });
        }
      });    

     

      router.get('/review/:name', async (req, res) => {
        const Name = req.params.name;
      
        try {
          const items = await Review.find({ name: Name });
          if (items.length === 0) {
            return res.status(404).json({ message: 'No items found for this collection' });
          }
          res.status(200).json({ items });
        } catch (error) {
          console.error('Error fetching items for collection:', error);
          res.status(500).json({ message: 'Error fetching items' });
        }
      });    


const express = require("express")
const router = express.Router();
const Tailor= require('../models/tailors');
const Review = require("../models/review");

console.log('Stock model imported:', Tailor);


//route to get all Tailors
router.get("/getallTailors",async(req,res)=>{

  
try{
  
    const tailors = await Tailor.find({});
    console.log("sending tailors");
    console.log("tailors fetched from DB:", tailors);
    res.json(tailors);
    res.status(200).json(tailors); // Send Tailors as a JSON response    
}
catch (error)
{
    return res.status(400).json({message:error});   
}
});
module.exports = router;


//create a blog post
router.post("/create-post", async (req, res) => {
  const newPost = new Tailor(req.body);
    try {
      // console.log("blog data from API:", req.body);
      await newPost.save();
      //const newPost = await Tailor.find({});
      //await newPost.save();
      res.status(201).send({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      console.error("Error creating post", error);
      res.status(500).send({ message: "Server error creating post" });
    }
  });
  // "/"= path, () = function, if empty its an anonymous function. req=request, res=response
  
  
 

module.exports = router;




//search route
router.get('/search-results', async (req, res) => {
    try {
        const { category } = req.query; // Read query param from the request
        console.log("search")
        // Find Tailors matching the category (case-insensitive)
        const categories = await Tailor.find({
            category: { $regex: category, $options: 'i' }
            
        }).distinct('category');
        console.log("search Tailors",categories)
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
      const collectionNames = await Tailor.distinct("collection");
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




 //get Tailors collection wise   
    router.get('/collection/:name', async (req, res) => {
        const collectionName = req.params.name;
      
        try {
          const Tailors = await Tailor.find({ collection: collectionName });
          if (Tailors.length === 0) {
            return res.status(404).json({ message: 'No Tailors found for this collection' });
          }
          res.status(200).json({ Tailors });
        } catch (error) {
          console.error('Error fetching Tailors for collection:', error);
          res.status(500).json({ message: 'Error fetching Tailors' });
        }
      });    
      module.exports = router;
     

      router.get('/review/:name', async (req, res) => {
        const Name = req.params.name;
      
        try {
          const Tailors = await Review.find({ name: Name });
          if (Tailors.length === 0) {
            return res.status(404).json({ message: 'No Tailors found for this collection' });
          }
          res.status(200).json({ Tailors });
        } catch (error) {
          console.error('Error fetching Tailors for collection:', error);
          res.status(500).json({ message: 'Error fetching Tailors' });
        }
      });    
      module.exports = router;
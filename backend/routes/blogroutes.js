//////////////////////sasindiiiiiiiiiiiiiiiii hiiiiiiiiiiiiiiii hellooooo it workeddddd
////////// hellooooo?
//////////////////////omfggggggggggggggggggggggggggg hiiiiiiiiii lmao
//////////////////////sasindiiiiiiiiiiiiiiiii hiiiiiiiiiiiiiiii hellooooo it workeddddd
////////// hellooooo?
//////////////////////omfggggggggggggggggggggggggggg hiiiiiiiiii lmao


const express = require("express"); //import express
const router = express.Router(); //define the router
const Blog= require('../models/blog');

//create a blog post
router.post("/create-post", async (req, res) => {
  try {
    // console.log("blog data from API:", req.body);
    const newPost = await Blog.find({});
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
//get all blogs
router.get("/", async (req, res) => {
  res.send("Blog routes are here :D");
});

module.exports = router; //export





////////////////////////////////////////////////

//update item route
router.put("/updateitem", async (req, res) => {
  const { oldCode, newCode } = req.body;

  try {
    // Find and update the module
    const module = await Module.findOne({ code: oldCode });
    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    module.code = newCode; // Update the code
    await module.save();   // Save to the database

    res.status(200).json({ message: "Module code updated successfully", module });
  } catch (error) {
    res.status(500).json({ error: "Failed to update module code", details: error });
  }
});

module.exports = router;




router.patch('/updateitem/:id', async (req, res) => {
  try {
    const {id} = req.params;

    // Validate ObjectId
    //if (!mongoose.Types.ObjectId.isValid(id)) {
      //return res.status(400).json({
        //status: 'Fail',
        //message: 'Invalid Item ID format',
      //});
    //}

    // Find and update the item
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure schema validation
    });

    // If no item is found
    if (!updatedItem) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Item not found',
      });
    }

    // Success response
    res.status(200).json({
      status: 'Success',
      data: {
        updatedItem,
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      status: 'Error',
      message: 'Server error occurred',
      details: err.message,
    });
  }
});

module.exports = router;




///////////////////////////////////////////////////////////
//delete item

app.delete('/deleteitem/:id', async(req,res) => {
  await Item.findByIdAndDelete(req.params.id)
  
  try{
    res.status(204).json({
        status : 'Success',
        data : {}
    })
  }catch(err){
      res.status(500).json({
          status: 'Failed',
          message : err
      })
  }
})



router.post("/postblog", async (req, res) => {
    console.log("noooooooo");
    const { title,
        description,
        content,
        coverImg,
        category,
        author,
        rating,
        createdAt} = req.body; 
    try {
      
      const newBlog = new Blog({
        title,
              description,
              content,
              coverImg,
              category,
              author,
              rating,
              createdAt

      });
      // save the blog
      await newBlog.save();
      console.log("New item saved to DB:");
      // sendsaved blog as a response
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(400).json({ error});
    }
  });
  
  module.exports = router;
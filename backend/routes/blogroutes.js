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
//const cors = require('cors');
//app.use(cors()); 

const express = require("express")
const router = express.Router();
const Item= require('../models/item')

console.log('Stock model imported:', Item);

router.get("/getallitems",async(req,res)=>{

try{
    const stocks = await Item.find({});
    console.log("sending items");
    console.log("Items fetched from DB:", stocks);
    res.json(stocks);
    //res.status(200).json(stocks); // Send items as a JSON response
}catch (error){
    return res.status(400).json({message:error});
}

});
module.exports = router;

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
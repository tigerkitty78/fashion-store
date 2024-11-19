const md5 = require('crypto-js/md5');
const express = require('express');
const app = express();
const router = express.Router();  // Create the router

app.use(express.json()); // Middleware to parse JSON request bodies

const merchantId = '1228344';
const merchantSecret = 'MzY2Nzg1ODM1MDE0NTgxMjE4NTM0MjQyMzk0Njk3MjM2OTA3MTM0MQ==';  // Keep this secret

// Route to generate hash
router.post('/generate-hash', (req, res) => {
    const { orderId, amount, currency } = req.body;

    // Format the amount
    const amountFormatted = parseFloat(amount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
    }).replaceAll(',', '');

    // Generate the hash using the provided data and the merchant secret
    const hash = md5(merchantId + orderId + amountFormatted + currency + merchantSecret).toString().toUpperCase();

    // Send the hash back to the frontend
    res.json({ hash });
    console.log("hash doneeeeeeeeeeeee");
});

// Register the router with the Express app
module.exports = router;

// Start the server


const Wishlist = require('../models/wishlist');

// Create a new wishlist item
const createWishlistItem = async (req, res) => {
  const { user, item, notes, quantity, rating } = req.body;

  try {
    // Create a new Wishlist document
    const newWishlistItem = new Wishlist({
      user,
      item,
      notes,
      quantity,
      rating
    });

    await newWishlistItem.save();
    res.status(201).json({
      message: 'Wishlist item added successfully',
      wishlistItem: newWishlistItem
    });
  } catch (error) {
    console.error('Error creating wishlist item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all wishlist items for a user
const getWishlistByUser = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const wishlist = await Wishlist.findOne({ user: userId })
        .populate('items.item') // Populate the 'item' field inside the 'items' array
        .exec();
  
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      res.json(wishlist);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  
// Update a wishlist by ID
const updateWishlist = async (req, res) => {
    try {
      const wishlistId = req.params.wishlistId;
      const updateData = req.body;
  
      const wishlist = await Wishlist.findById(wishlistId);
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist not found' });
      }
  
      // Merge existing items with updated items
      if (updateData.items) {
        updateData.items.forEach((updatedItem) => {
          const existingItem = wishlist.items.find(
            (item) => item.item.toString() === updatedItem.item
          );
          if (existingItem) {
            // Update the existing item's properties
            existingItem.quantity = updatedItem.quantity || existingItem.quantity;
            existingItem.rating = updatedItem.rating || existingItem.rating;
            existingItem.notes = updatedItem.notes || existingItem.notes;
            existingItem.isPurchased =
              updatedItem.isPurchased !== undefined
                ? updatedItem.isPurchased
                : existingItem.isPurchased;
          } else {
            // Add a new item
            wishlist.items.push(updatedItem);
          }
        });
      }
  
      // Update other fields if provided
      if (updateData.addedAt) {
        wishlist.addedAt = updateData.addedAt;
      }
  
      await wishlist.save();
  
      res.json({ message: 'Wishlist updated successfully', wishlist });
    } catch (error) {
      console.error('Error updating wishlist:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getAllWishlists = async (req, res) => {
    try {
      const wishlists = await Wishlist.find().populate('user').populate('items.item');
      res.json(wishlists);
    } catch (error) {
      console.error('Error fetching all wishlists:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  
  module.exports = {
    getWishlistByUser,createWishlistItem,updateWishlist,getAllWishlists
  };

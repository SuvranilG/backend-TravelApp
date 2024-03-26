const mongoose = require('mongoose');
const User = require('./user.model');

const wishlistSchema = new mongoose.Schema({
    hotelId: { type: String, required: true },
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
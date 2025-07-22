const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items: [
    {
      productId: String,
      name: String,
      quantity: {
        type: Number,
        required: true,
        min:1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

    status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
   deliveryAddress: {
    type:String,
    required:true,

  },

},{timestamps:true})
module.exports = mongoose.model('Order', orderSchema);

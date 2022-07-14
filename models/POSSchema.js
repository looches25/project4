const mongoose = require('mongoose')

  const POSSchema = new mongoose.Schema(
    {
      orders: [{
        SKUid: { type: String},
        SKUname: { type: String},
        price: { type: Number },
        quantity: { type: Number },
      }]
    }
  );

module.exports = mongoose.model("POS", POSSchema)
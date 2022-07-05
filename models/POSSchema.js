const mongoose = require('mongoose')

const OrderListSchema = new mongoose.Schema({ 
    SKUid: {type: Number},
    CartQty:{type:Number}
});

const POSSchema = mongoose.Schema ({
    CustID: {type: Number, required: true},
    OrderList: {type:OrderListSchema},
    TransactionTime: {},
    PaymentType: {type: String}
})

module.exports = mongoose.model("POS", POSSchema)
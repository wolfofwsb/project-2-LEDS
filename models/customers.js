const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
    services: {
        type: String,
        enum: ['LED Headlight', 'LED Bar', 'Window Tint'],
        default: 'LED Headlight'
    },
    date: Date,
    
    customer: {type: Schema.Types.ObjectId, ref: 'Customers'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

const customerSchema = new Schema ({
    email: String,
    name: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    appointments: [appointmentSchema],
    phone: String

});


module.exports = mongoose.model("Customers", customerSchema);
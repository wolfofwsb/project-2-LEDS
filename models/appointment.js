const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

// The purpose of the schema is to enforce the shape
// of our documents in our movies Collection (Movie)
const appointmentSchema = new Schema ({
    services: {
        type: String,
        enum: ['LED Headlight', 'LED Bar', 'Window Tint'],
        default: 'LED Headlight'
    },
    date: Date,
    price: Number,
    time: Number,
    client: {type: Schema.Types.ObjectId, ref: 'Customer'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

// movies collection (if you looked in mongdob, after you put something in it!)
module.exports = mongoose.model("Appointment", appointmentSchema);

// THE POINT OF THIS FILE
// Is to create our model and export it
// Our model can perform CRUD operations on our database
// typically we import the model in our controllers to use it

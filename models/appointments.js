const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        enum: ['Passyunk', 'Fishtown', 'Center City', 'Manayunk'],
        required: true
    },
    date: {
        type: Date,
        default: function () {
            return new Date(new Date().setFullYear(new Date().getFullYear() +1))
    },
    required: true
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});


module.exports = mongoose.model("Appointment", appointmentSchema);
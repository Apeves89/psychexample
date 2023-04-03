const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    provider: {
        type: String,
        enum: ['Eduardo Hernandez, MD', 'Jessica Parlor, D.O.', 'Skye James, P.A.',
    'Alejando Clayton, N.P.', 'Cynthia Boyd, MD', 'Snow Winters, N.P']
    },
    insurance: {
        type: String,
        enum: ['BlueCross', 'Medicare', 'Aetna']
    },
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

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
    provider:providerSchema,
    
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});


module.exports = mongoose.model("Appointment", appointmentSchema);
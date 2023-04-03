const AppointmentModel = require('../models/appointments')

module.exports = {
    update:addProvider
}

function addProvider(req,res){
    AppointmentModel.findById(req.params.id)
    .then(function (foundAppointment) {
        req.body.userId = req.user._id
        foundAppointment.provider = req.body
        foundAppointment.save()
        res.redirect(`/appointments/${req.params.id}`)
    }).catch((err) =>{
        console.log(err);
        res.send(err)
      })
}
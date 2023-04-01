const AppointmentModel = require('../models/appointments'); 


module.exports = {
    index,
    show,
    new:addAppointment,
    create,
    edit,
    update,
    delete:deleteAppointment
}

function index(req,res) {
    AppointmentModel.find({})
    .then(function (allAppointments) {
        console.log(allAppointments,"<----- list of all appointments");
        res.render('appointments/index',{appointments:allAppointments})
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}
function show(req,res) {
    AppointmentModel.findById(req.params.id)
    .then(function (foundAppointment) {
        console.log(foundAppointment,"<----- found appointment");
        res.render('appointments/show',{appointment:foundAppointment})        
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}

function addAppointment(req,res) {
    res.render("appointments/new")
}

function create(req,res) {
    req.body.userId = req.user._id; 
    AppointmentModel.create(req.body)
    .then(function (createdAppointment) {
        console.log(createdAppointment,"<----- created appointment");
        res.redirect('/appointments')
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}
function edit(req,res) {
    AppointmentModel.findById(req.params.id)
    .then(function (foundAppointment) {
        console.log(foundAppointment.date,"<----- found appointment");
        const dobYear = foundAppointment.dob.getFullYear()
        let dobMonth = foundAppointment.dob.getMonth() + 1
        if(dobMonth < 10){
            dobMonth = `0${dobMonth}`
        }
        let dobDay = foundAppointment.dob.getDate()
        if(dobDay < 10){
            dobDay = `0${dobDay}`
        }
        const dob = `${dobYear}-${dobMonth}-${dobDay}`;
        
        const dateYear = foundAppointment.date.getFullYear()
        let dateMonth = foundAppointment.date.getMonth() + 1
        if(dateMonth < 10){
            dateMonth = `0${dateMonth}`
        }
        const dateDay = foundAppointment.date.getDate()
        const dateTime = foundAppointment.date.toLocaleTimeString('en-US')
        const date = `${dateYear}-${dateMonth}-${dateDay}T${dateTime}`;
        res.render('appointments/edit',{appointment:foundAppointment,dob,date})        
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}
function update(req,res) {
    AppointmentModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    .then(function (updatedAppointment) {
        console.log(updatedAppointment,"<----- updated appointment");
        res.redirect(`/appointments/${req.params.id}`)
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}
function deleteAppointment(req,res) {
    AppointmentModel.findByIdAndDelete(req.params.id)
    .then(function (deletedAppointment) {
        console.log(deletedAppointment,"<----- deleted appointment");
        res.redirect(`/appointments`)
    }).catch(function (err) {
        console.log(err);
        res.send(err)
    })
}
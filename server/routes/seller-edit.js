const Seller = require('../models/user-model');
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { MongoClient, ServerApiVersion } = require('mongodb');

module.exports = (app) => {

// for backend and express
app.use(express.urlencoded({ extended: false })); //parses URL-encoded data

app.post("/update", async(req, res) =>
{
    try 
    {
        const result = await Seller.findByIdAndUpdate(req.query.id, req.body);
        console.log(result);
    } 
    catch (err) 
    {
        console.log(err);
    }
});

app.get('/getUsers', (req, res) => {
    Seller.find()
    .then(sellers => res.json(sellers))
    .catch(err => res.json(err))
});

//Get user by ObjectID
app.get('/getUserByID', (req, res) => {
    Seller.findById(req.query.id)
    .then(data => res.json(data))
    .catch(error => res.json(error))
});

app.post('/product', async (req, res) => {
    var pageID = req.body.pageID;
    var fail = false;
    if (dbo.getDb() != null) {
        //MONGODB QUERY HERE
        var info = await dbo.getStructureInfo(parseInt(pageID));
        if (info == null) {
            fail = true;
        }
        else {
            res.send(JSON.stringify(info));
        }
    }
    else {
        fail = true;
    }
    if (fail) {
        res.send({
            structureName: 'Failed to get structure',
            structureDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis magna vel dolor efficitur efficitur. Donec aliquet vehicula mi et cursus. Suspendisse lacinia urna tellus, ac rhoncus purus efficitur vitae. Maecenas laoreet elit neque, eget lacinia purus consequat sit amet. Phasellus nulla velit, molestie id dolor sed, feugiat suscipit metus. Suspendisse sodales enim ac mauris eleifend congue. Vivamus gravida imperdiet augue, eget commodo diam congue a. In consequat cursus nisl, id eleifend orci imperdiet non. Donec id porta enim, vel pellentesque sem. Aliquam sit amet tristique lacus, et mollis lorem. Sed fringilla vestibulum tellus. Suspendisse luctus ante finibus, accumsan tortor quis, tempor elit. Quisque laoreet metus id diam cursus varius. ',
            image_main: 'https://loremflickr.com/320/240',
            sub_image: 'https://loremflickr.com/320/240/'
        });
    }
});

};
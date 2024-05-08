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

};

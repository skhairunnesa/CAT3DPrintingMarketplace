/*
const express = require('express')
const router = express.Router()

//GEt all
router.get("/", (req, res) => {
    res.send('Hello World')
})
//Get one
router.get("/:id", (req, res) => {

})
//creating one
router.post("/", (req, res) => {

})
//update one //Instead of PUT
router.patch("/:id", (req, res) => {

})
//deleting one
router.delete("/:id", (req, res) => {
    req.params
})

module.exports = router
*/






const express = require('express')
const router = express.Router()
const House = require('../models/house')
const dbo = require("../db/conn")
//GEt all
/*
router.get("/", async (req, res) => {
    //res.send('Hello World')
    //const allHouses = await House.find();
    //let thyHouseee = []
    const allHouses = await House.find();
    res.json(allHouses)
    try {
        //const allHouses = await House.find();
        const allHouses = await House.findOne({ structure_type: "house"}, { _id: 1 });
    } catch(err) {
        res.status(500).json( { message: err.message } )
    }
}) */
//Get all entries of the database
router.post("/", async (req, res) => {
    //const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });
    // const reqBody = req.body.test
    // if(reqBody == 1) {
    //     console.log("This is when tag 1 vale == 1");
    //     const wasd = await House.find( {structure_type: "house"}).limit(3);
    //     res.status(201).json(wasd);
    // }
    try {
        //const wasd = await House.find();
        //const wasd2 = await House.findOne({ structure_id: 4});
        //const testArray = [wasd, wasd2]
        //res.status(201).json(wasd);
        //res.status(201).json(wasd);
        const allTheThings = await dbo.getAllStructureInfo();
       // console.log(allTheThings);
        res.status(201).json(allTheThings);
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})
//Get one
//Note /:id --> indicates taht it is a parameter
/*
router.get("/:id", (req, res) => {

})*/
/*
router.get("/:id", (req, res) => {

})*/
/*
//creating one
router.post("/", (req, res) => {

})
*/
/*
//Just moving my old get One elem ID into here
router.post("/", async (req, res) => {
    //const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });

    try {
        const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });
        const weee = wasd._id.toString();
        res.status(201).json({data : weee});
        //res.status(201).send({data : weee});
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})










/*
///post
router.post("/", async (req, res) => {
    //const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });

    try {
        const wasd = await House.findOne({ structure_id: 1});
        const wasd2 = await House.findOne({ structure_id: 4});
        const testArray = [wasd, wasd2]
        res.status(201).json(testArray);
        //res.status(201).json(wasd);
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})
*/
//update one //Instead of PUT
router.patch("/:id", (req, res) => {

})
//deleting one
router.delete("/:id", (req, res) => {
    //req.params
})




/*
router.post("/:id", async (req, res) => {
    //const wasd = await House.findOne({ structure_type: "house"}, { _id: 1 });
    try {
        const plzID = (req.params.id).valueOf();
        console.log("HEHE");
        console.log(plzID);
        const wasd = await House.findOne({structure_id: plzID});
        //const wasd2 = await House.findOne({ structure_id: 4});
        //const testArray = [wasd, wasd2]
        res.status(201).json(wasd);
        //res.status(201).json(wasd);
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})
*/

module.exports = router

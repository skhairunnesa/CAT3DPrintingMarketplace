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
const Product = require('../models/product-model');


async function getAllStructureInfo(){
     var result = await Product.find();
     return result;
}

async function getUniqueStructureInfo(reqBody){
     var result;
     if(reqBody.query == "" || reqBody === undefined){
          result = await Product.find();
     } else{
          var isNumber = !isNaN(reqBody.query);
          if(isNumber){
               result = await Product.find({
                    $or: [
                      { structure_id: Number(reqBody.query) },
                      { user_id: Number(reqBody.query) },
                    ]
                });
          }
          else{
               result = await Product.find({
                    $or: [
                      { structure_type: reqBody.query },
                      { tags: reqBody.query }
                    ]
                });
          }
     }
     return result;
}

//Get all entries of the database
router.post("/", async (req, res) => {
    try {
        const allTheThings = await getAllStructureInfo();
        res.status(201).json(allTheThings);
    }catch(err) {
        res.status(400).json( { message: err.message } )
    }
})

router.post("/1", async (req, res) =>{
     const reqBody = req.body;
     console.log(reqBody)
     try {
          const structures = await getUniqueStructureInfo(reqBody);
          res.status(201).json(structures);
     } catch (error) {
          res.status(400).json({message: error.message});
     }
})

//update one //Instead of PUT
router.patch("/:id", (req, res) => {

})
//deleting one
router.delete("/:id", (req, res) => {
    //req.params
})


module.exports = router

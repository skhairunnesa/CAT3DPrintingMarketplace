const express = require('express');
const router = express.Router();

const {
    getAllStructures,
    getStructureById,
    getStructuresByTags,
    getRelatedStructures
} = require('../controllers/structureController')

//@desc GET all structures from db
//@route  GET /api/structures
//@access Public
router.get('/', getAllStructures);

// router.get("/:structure_id" , (req, res) =>{
//     const {structure_id} = req.params;
//     res.send(`Structure ID: $(structure_id)`);
// });


//@desc GET a structure from db
//@route  GET /api/structures/:structure_id
//@access Public
router.get('/:id', getStructureById);

router.get('/tags/:tags', getStructuresByTags);

// @desc Get related structures from the database
// @route POST /api/structures/related
// @access Public
router.post('/related', getRelatedStructures);

module.exports = router;

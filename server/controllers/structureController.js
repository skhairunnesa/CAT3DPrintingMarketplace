const Structure = require('../models/structureModel');

const  getAllStructures = async (req, res) => {
    try{
        let structures = await Structure.find({});

        res.json(structures);
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
};

const getStructureById = async (req, res) => {
    try{
        console.log(req.params);
        let structure = await Structure.findOne({ structure_id: req.params.id });

        res.json(structure);
        }catch(error){
            console.error(error);
            res.status(500).json({message: 'Server error'});
        }
};
const getStructuresByTags = async (req, res) => {
    try {
        // Query structures where at least one tag matches
        const structures = await Structure.find({ tags: {$in: req.params.tags} });

        res.json(structures);
    } catch (error) {
        console.log("BIG ERROR:...", error);
    }
};

const getRelatedStructures = async (req, res) => {
    const {structure_id, structure_type, tags} = req.body;

    try {
        const relatedStructures = await Structure.find({
            structure_id: {$ne: structure_id}, structure_type: structure_type, tags: {$nin: ["trendy"], $in: tags}
        });
        const relatedStructuresByType = await Structure.find({
            structure_id: {$ne: structure_id}, structure_type: structure_type, tags: {$nin: ["trendy"]}
        });
        const relatedStructuresByTags = await Structure.find({
            structure_id: {$ne: structure_id}, tags: {$nin: ["trendy"], $in: tags}
        })
        const combinedRelatedStructures = [...relatedStructures, ...relatedStructuresByType, ...relatedStructuresByTags]
        const uniqueRelatedStructures = Array.from(new Map(combinedRelatedStructures.map(item => [item['_id'].toString(), item])).values());

        res.json(uniqueRelatedStructures);
    } catch (error) {
        res.status(500).json({message: "Error fetching related structures", error: error});
    }
};

module.exports = {
    getAllStructures,
    getStructureById,
    getStructuresByTags,
    getRelatedStructures
};

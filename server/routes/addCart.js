const router = require('express').Router();
let addCart = require('../models/addCart.model');

router.route('/').get((req, res) => {
  addCart.find()
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const user_id = req.body.user_id;
  const designer = req.body.designer;
  const product_id = req.body.product_id;
  const total_cost = req.body.total_cost;
  const numBed = req.body.numBed;
  const numBath = req.body.numBath;
  const q = req.body.q;
  const tags = req.body.tags;


  const AddtoCart = new addCart({user_id,designer,product_id,total_cost,numBed,numBath,q,tags});

  AddtoCart.save()
    .then(() => res.json('Item added to Cart!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

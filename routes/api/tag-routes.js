const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// Basically, it's very similar for all routes. Just do Tag.findOne (GET/get one product)/ Tag.findAll(GET/all products) / Tag.Update (PUT) / Tag.destroy (DELETE) / Tag. / Tag.create(POST). 
// We end with then/catch statements of 200 for then/ 400 for catch.
// req.params.id for singular: router.get/Tag.findOne , for PUT, for delete.
// req.body for PUT and also req.params.id, 

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // json(tags) for multiple

  Tag.findAll({ 
    include: [ 
    {
    model: Product,
    through: ProductTag,
      }, 
    ],
  })
    .then((tags) => res.status(200).json(tags))
    .catch((err) => res.status(500).json(err));
});

// json(tag) for single

router.get('/:id', (req, res) => {
  Tag.findOne({ where: {
    id: req.params.id,
      },
    include: [ { 
        model: Product,
        through: ProductTag,
      },
    ],
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, { where: {
      id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: {
    id: req.params.id,
    },
  })
    .then((tag) => res.status(200).json(tag))
    .catch((err) => res.status(404).json(err));
});

module.exports = router;

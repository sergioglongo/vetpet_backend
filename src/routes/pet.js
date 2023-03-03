const express = require('express');
const router = express.Router();
const { Pet } = require('../db');


// GET all pets
router.get('/getAllPets', async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json({ success: true, data: pets });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET pet by id
router.get('/getPetById/:id', async (req, res) => {
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (pet) {
      res.status(200).json({ success: true, data: pet });
    } else {
      res.status(404).json({ success: false, error: 'Pet not found' });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// CREATE pet
router.post('/createPet', async (req, res) => {
  const { namePet, identification, weight, birthdate } = req.body;
  if (!namePet || !identification || !weight) {
    return res.status(400).json({ success: false, error: 'Missing required fields: namePet, identification, weight' });
  }
  try {
    const pet = await Pet.create({ namePet, identification, weight, birthdate });
    res.status(201).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// UPDATE pet by id
router.put('/putPet/:id', async (req, res) => {
  const { namePet, identification, weight, birthdate } = req.body;
  try {
    const pet = await Pet.findByPk(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, error: 'Pet not found' });
    }
    await pet.update({ namePet, identification, weight, birthdate });
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;

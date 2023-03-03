const express = require('express');
const { Veterinarian } = require('../db');

const router = express.Router();

// Get all veterinarians
router.get('/getAllVeterinarian', async (req, res) => {
  try {
    const veterinarians = await Veterinarian.findAll();
    res.status(200).json({ success: true, result: veterinarians });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get veterinarian by ID
router.get('/getVeterinarianById/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const veterinarian = await Veterinarian.findByPk(id);
    if (!veterinarian) {
      return res.status(404).json({ success: false, error: 'Veterinarian not found' });
    }
    res.status(200).json({ success: true, result: veterinarian });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Create a new veterinarian
router.post('/createVeterinarian', async (req, res) => {
  const { nameVeterinarian, mail, address, phone, identification, idUser } = req.body;
  if (!nameVeterinarian || !mail || !identification || idUser) {
    return res.status(400).json({success: false, message: 'Missing required fields'});
  }try {
    const newVeterinarian = await Veterinarian.create({
      nameVeterinarian,
      mail,
      address,
      phone,
      identification,
      idUser
    });
    res.status(201).json({ success: true, result: newVeterinarian });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update a veterinarian by ID
router.put('/putVeterinarian/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const veterinarian = await Veterinarian.findByPk(id);
      if (!veterinarian) {
        return res.status(404).json({success: false, message: 'Veterinarian not found'});
      }
      await veterinarian.update(req.body);
      return res.status(200).json({success: true, message: 'Veterinarian updated successfully', result: veterinarian});
    } catch (error) {
      return res.status(500).json({success: false, message: error.message});
    }
  });
  

// Delete a veterinarian by ID
router.delete('/veterinarians/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const veterinarian = await Veterinarian.findByPk(id);
    if (!veterinarian) {
      return res.status(404).json({ success: false, error: 'Veterinarian not found' });
    }
    await veterinarian.destroy();
    res.status(204).json({ success: true, result: {} });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;

const express = require('express');
const { Client } = require('../db');
const { User } = require('../db');
const { TypeUser } = require('../db');

const router = express.Router();

// Get all clients
router.get('/getAllClients', async (req, res) => {
    try {
        const clients = await Client.findAll(
            {
                include: [{
                    model: User,
                    attributes: { exclude: ['password', 'idTypeUser'] },
                    include: [{ model: TypeUser }]
                }],
                attributes: { exclude: ['idUser', 'password'] }
            }
        );

        const totalClients = await Client.count();
        const activeClients = await Client.count({
            where: { status: true }
        });

        res.status(200).json({ success: true, totalClients, activeClients, result: clients });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Get client by ID
router.get('/getClientById/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const client = await Client.findByPk(id, {
            include: [{
                model: User,
                attributes: { exclude: ['password', 'idTypeUser'] },
                include: [{ model: TypeUser }]
            }],
            attributes: { exclude: ['idUser', 'password'] }
        });
        if (!client) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }
        res.status(200).json({ success: true, result: client });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Create a new client
router.post('/createClient', async (req, res) => {
    const { nameClient, mail, address, phone } = req.body;
    if (!nameClient || !mail || !address || !phone) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    try {
        const newClient = await Client.create({
            nameClient,
            mail,
            address,
            phone,
        });
        res.status(201).json({ success: true, result: newClient });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Update an client by ID
router.put('/putClient/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        await client.update(req.body);
        return res.status(200).json({ success: true, message: 'Client updated successfully', result: client });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});


// Delete an client by ID
router.delete('/deleteclient/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const client = await Client.findByPk(id);
        if (!client) {
            return res.status(404).json({ success: false, error: 'Client not found' });
        }
        await client.destroy();
        res.status(204).json({ success: true, result: {} });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;

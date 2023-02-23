const { Router } = require('express');

const { Vaccine } = require('../db');

const router = Router();

router.get("/getAllVaccines", async (req, res, next) => {
    try {
        await Vaccine.findAll()
            .then(result => res.status(200).json(result))
            .catch(error => res.json(error))
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
});

router.get('/getVaccineById/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la vacuna desde los parámetros de la solicitud
        const vaccine = await Vaccine.findByPk(id); // Buscar el registro de Vaccine con el ID especificado
        if (vaccine) {
            res.json({ success: true, result: vaccine }); // Enviar una respuesta JSON que contiene el registro de Vaccine encontrado
        } else {
            res.status(404).json({ success: false, error: `Vaccine with ID ${id} not found` }); // Enviar una respuesta HTTP 404 si no se encuentra el registro
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al buscar el registro
    }
});

router.post('/createVaccine', async (req, res) => {
    try {
        const { nameVaccine, description } = req.body; // Obtener el nombre y la descripción de la vacuna desde el cuerpo de la solicitud
        const vaccine = await Vaccine.create({ nameVaccine, description }); // Crear un nuevo registro en la tabla Vaccine
        res.status(201).json({ success: true, result: vaccine }); // Enviar una respuesta HTTP 201 que indica que se ha creado un nuevo registro
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al crear un nuevo registro
    }
});

router.put('/updateVaccine/:id', async (req, res) => {
    try {
        const { nameVaccine, description } = req.body; // Obtener el nuevo nombre y la nueva descripción de la vacuna desde el cuerpo de la solicitud
        const { id } = req.params; // Obtener el ID de la vacuna a actualizar desde los parámetros de la solicitud
        const vaccine = await Vaccine.findByPk(id); // Buscar el registro de Vaccine con el ID especificado
        if (vaccine) {
            await vaccine.update({ nameVaccine, description }); // Actualizar el nombre y la descripción del registro Vaccine con los nuevos valores
            res.json({ success: true, result: vaccine }); // Enviar una respuesta JSON que indica que se ha actualizado el registro
        } else {
            res.status(404).json({ success: false, error: `Vaccine with ID ${id} not found` }); // Enviar una respuesta HTTP 404 si no se encuentra el registro
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al actualizar el registro
    }
});

module.exports = router;
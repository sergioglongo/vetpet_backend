const { Router } = require('express');
const router = Router();
const { TypeUser } = require('../db');

const initialData = [
    {
        "typeUser": "Administrator",
    },
    {
        "typeUser": "Veterinarian",
    },
    {
        "typeUser": "Owner",
    },
];

router.get("/getAllTypeUser", async (req, res) => {
    try {
        await TypeUser.findAll()
            .then(result => res.status(200).json({ success: true, result: result }))
            .catch(error => res.json({ success: false, error: error.message }))
    } catch (error) {
        res.status(400).send({ success: false, error: error.message })
    }
});

router.get('/getTypeUserById/:id', async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del tipo de usuario desde los parámetros de la solicitud
        const typeUser = await TypeUser.findByPk(id); // Buscar el registro de TypeUser con el ID especificado
        if (typeUser) {
            res.json({ success: true, result: typeUser }); // Enviar una respuesta JSON que contiene el registro de TypeUser encontrado
        } else {
            res.status(404).json({ success: false, error: `TypeUser with ID ${id} not found` }); // Enviar una respuesta HTTP 404 si no se encuentra el registro
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al buscar el registro
    }
});

router.post('/createTypeUser', async (req, res) => {
    try {
        const { typeUser } = req.body; // Obtener el nombre del tipo de usuario desde el cuerpo de la solicitud
        const typeUserCreated = await TypeUser.create({ typeUser }); // Crear un nuevo registro en la tabla TypeUser
        res.status(201).json({ success: true, result: typeUserCreated }); // Enviar una respuesta HTTP 201 que indica que se ha creado un nuevo registro
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al crear un nuevo registro
    }
});

router.put('/updateTypeUser/:id', async (req, res) => {
    try {
        const { typeUser } = req.body; // Obtener el nuevo nombre del tipo de usuario desde el cuerpo de la solicitud
        const { id } = req.params; // Obtener el ID del tipo de usuario a actualizar desde los parámetros de la solicitud
        const typeUserUpdated = await TypeUser.findByPk(id); // Buscar el registro de TypeUser con el ID especificado
        if (typeUserUpdated) {
            await typeUserUpdated.update({ typeUser }); // Actualizar el nombre del registro TypeUser con el nuevo nombre
            res.json({ success: true, result: typeUserUpdated }); // Enviar una respuesta JSON que indica que se ha actualizado el registro
        } else {
            res.status(404).json({ success: false, error: `TypeUser with ID ${id} not found` }); // Enviar una respuesta HTTP 404 si no se encuentra el registro
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message }); // Enviar una respuesta HTTP 400 si hay algún error al actualizar el registro
    }
});

router.post('/precharge', (req, res) => {
    try {
        typeUser.bulkCreate(initialData)
            .then(res.status(200).send(initialData))
            .catch(error => res.json(error))
    } catch (error) {
        res.status(403).send({ error: "Error in precharge" })
    }
})

module.exports = router;



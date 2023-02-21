const { Router } = require('express');

const { TypeUser } = require('../db');

const router = Router();

const datosIniciales = [
    {
        tipoUsuario: "Superusuario"
    },
    {
        tipoUsuario: "Administrativo"
    },
    {
        tipoUsuario: "Padre/Tutor"
    }
]

router.get("/all", async (req, res, next) => {
    try {
        await TypeUser.findAll()
        .then(result => res.status(200).json(result))
        .catch(error => res.json(error))
    } catch (error) {
        res.status(400).send({error: error.message})     
    }
})

router.get('/id/:idTipoUsuario', async (req,res,next) => {
    
    const { idTipoUsuario } = req.params;
    if (!idTipoUsuario ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const tipoUsuarioDb = await TipoUsuario.findByPk(idTipoUsuario); 
    
    if (!tipoUsuarioDb) return res.status(404).json({ err: "No se encontro el tipo de usuario: " + idTipoUsuario});
    
    res.status(200).json(tipoUsuarioDb) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

router.post('/create', (req,res,next) => {
    const { tipoUsuario } = req.body;
    const tipoUsuarioNew = req.body
    if (!tipoUsuario ) return res.status(400).json({ err: "Falta TIPO" })
    try{
        TipoUsuario.create(tipoUsuarioNew)
        .then(res.status(200).send(tipoUsuarioNew))
        .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

router.put('/put', async (req,res,next) => {
    const { idTipoUsuario, tipoUsuario } = req.body;
    const tipoUsuarioNew = req.body
    if (!idTipoUsuario || !tipoUsuario ) return res.status(400).json({ err: "Falta el ID || TIPO" })
    try{
    const registro = await TipoUsuario.findByPk(idTipoUsuario); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el tipo de usuario: " + idTipoUsuario});
    
    TipoUsuario.update(tipoUsuarioNew, {where: {idTipoUsuario: idTipoUsuario}}).then(() => {res.json(tipoUsuarioNew);}).catch(error => res.json(error))

}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })
 
router.delete('/delete/:idTipoUsuario', async (req,res,next) => {
    
    const { idTipoUsuario } = req.params;
    if (!idTipoUsuario ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const registro = await TipoUsuario.findByPk(idTipoUsuario); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el tipo de usuario: " + idTipoUsuario});
    
    TipoUsuario.destroy({where: {idTipoUsuario: idTipoUsuario}})
    .then(result => {res.send("El tipo de usuario fue eliminado");}) // comunicacion con la BD M4
    .catch(error => res.json(error))
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

 router.post('/precarga', (req,res,next) => {
    try{
        TipoUsuario.bulkCreate(datosIniciales)
        .then(res.status(200).send(datosIniciales))
        .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

module.exports = router;
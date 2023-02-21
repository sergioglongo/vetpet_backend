const { Router } = require('express');

const { User } = require('../db');
const { TipoUsuario } = require('../db');

const router = Router();

const datosIniciales=[
    {
        "nombreUsuario": "supervisor",
        "mailUsuario": "supervisor@gmail.com",
        "idTipoUsuario": 1
    },
    {
        "nombreUsuario": "Admin",
        "mailUsuario": "admin@gmail.com",
        "idTipoUsuario": 2
    },
    {
        "nombreUsuario": "Padre1",
        "mailUsuario": "papa1@gmail.com",
        "idTipoUsuario": 3
    }
]

router.get("/all", async (req, res, next) => {
    try {
        await User.findAll().then(result => res.status(200).json(result))
    } catch (error) {
        res.status(400).send({error: error.message})     
    }
})

router.get('/id/:idUsuario', async (req,res,next) => {
    
    const { idUsuario } = req.params;
    if (!idUsuario ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const tipoUsuarioDb = await Usuario.findByPk(idUsuario); 
    
    if (!tipoUsuarioDb) return res.status(404).json({ err: "No se encontro el usuario: " + idUsuario});
    
    res.status(200).json(tipoUsuarioDb) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

router.post('/create', async(req,res,next) => {
    const { nombreUsuario , idTipoUsuario , mailUsuario} = req.body;
    const tipoUsuarioNew = req.body
    const registro = await TipoUsuario.findByPk(idTipoUsuario); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el tipo de usuario: " + idTipoUsuario});

    if (!nombreUsuario || !idTipoUsuario || !mailUsuario) return res.status(400).json({ err: "Faltan datos" })
    try{
        Usuario.create(tipoUsuarioNew).then(res.status(200).json(tipoUsuarioNew))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

router.put('/put', async (req,res,next) => {
    const { idUsuario, nombreUsuario } = req.body;
    const tipoUsuarioNew = req.body
    if (!idUsuario || !nombreUsuario ) return res.status(400).json({ err: "Falta el ID || TIPO" })
    try{
    const registro = await Usuario.findByPk(idUsuario); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el usuario: " + idUsuario});
    
    Usuario.update(tipoUsuarioNew, {where: {idUsuario: idUsuario}}).then(() => {res.json(tipoUsuarioNew);}).catch(error => res.json(error))

}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })
 
router.delete('/delete/:idUsuario', async (req,res,next) => {
    
    const { idUsuario } = req.params;
    if (!idUsuario ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const registro = await Usuario.findByPk(idUsuario); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el usuario: " + idUsuario});
    
    Usuario.destroy({where: {idUsuario: idUsuario}}).then(result => {res.send("El tipo de usuario fue eliminado");}) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

 router.post('/precarga', (req,res,next) => {
    try{
        Usuario.bulkCreate(datosIniciales)
        .then(res.status(200).send(datosIniciales))
        .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})
module.exports = router;
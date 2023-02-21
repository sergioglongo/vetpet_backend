const { Router } = require('express');

const { Notificacion } = require('../db');
const { TipoNotificacion } = require('../db');

const router = Router();



router.get("/all", async (req, res, next) => {
    try {
        await Notificacion.findAll().then(result => res.status(200).json(result))
    } catch (error) {
        res.status(400).send({error: "La operacion no fue exitosa"})     
    }
})

router.get('/id/:idNotificacion', async (req,res,next) => {
    
    const { idNotificacion } = req.params;
    if (!idNotificacion ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const tipoNotificacionDb = await Notificacion.findByPk(idNotificacion); 
    
    if (!tipoNotificacionDb) return res.status(404).json({ err: "No se encontro la notificacion: " + idNotificacion});
    
    res.status(200).json(tipoNotificacionDb) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

router.post('/create', async(req,res,next) => {
    const { asunto, cuerpo , fechaNotificacion , idTipoNotificacion , activa} = req.body;
    const notificacionNew = req.body
    const tipoNotificacionExiste = await TipoNotificacion.findByPk(idTipoNotificacion); 
    
    if (!tipoNotificacionExiste) return res.status(404).json({ err: "No se encontro el tipo de notificacion: " + idTipoNotificacion});

    if (!asunto || !cuerpo  || !activa ) 
        return res.status(400).json({ err: "Faltan datos" })
    try{
        Notificacion.create(notificacionNew).then(res.status(200).json(notificacionNew))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

router.put('/put', async (req,res,next) => {
    const { idNotificacion, asunto, cuerpo , fechaNotificacion , idTipoNotificacion , activa } = req.body;
    const notificacionNew = req.body

    const tipoNotificacionExiste = await TipoNotificacion.findByPk(idTipoNotificacion); 
    if (!tipoNotificacionExiste) 
        return res.status(404).json({ err: "No se encontro el tipo de notificacion: " + idTipoNotificacion});

    const notificacionExiste = await Notificacion.findByPk(idNotificacion);
    if (!notificacionExiste) 
        return res.status(404).json({ err: "No se encontro la notificacion: " + idNotificacion});

    if (!asunto || !cuerpo || !fechaNotificacion || !activa || !mailUsuario) 
        return res.status(400).json({ err: "Faltan datos" })
    try{

        Notificacion.update(notificacionNew, {where: {idNotificacion: idNotificacion}})
            .then(() => {res.json(notificacionNew);})
            .catch(error => res.json(error))

    }catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })
 
router.delete('/delete/:idNotificacion', async (req,res,next) => {
    
    const { idNotificacion } = req.params;
    if (!idNotificacion ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const registro = await Notificacion.findByPk(idNotificacion); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro la notificacion: " + idNotificacion});
    
    Notificacion.destroy({where: {idNotificacion: idNotificacion}}).then(result => {res.send("El tipo de notificacion fue eliminado");}) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })


module.exports = router;
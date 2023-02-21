const { Router } = require('express');

const { TipoNotificacion } = require('../db');

const router = Router();

const datosIniciales=[
        {tipoNotificacion:"General"},
        {tipoNotificacion:"Informativa"},
        {tipoNotificacion:"Reunion"},
        {tipoNotificacion:"Salida"},
        {tipoNotificacion:"Viaje"},
        {tipoNotificacion:"Materiales"},
]

router.get("/all", async (req, res, next) => {
    try {
        await TipoNotificacion.findAll().then((result) => res.status(200).send(result))
    } catch (error) {
        res.status(400).send({error: "La operacion getall no fue exitosa"})     
    }
})

router.get('/id/:idTipoNotificacion', async (req,res,next) => {
    
    const { idTipoNotificacion } = req.params;
    if (!idTipoNotificacion ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const tipoNotificacionDb = await TipoNotificacion.findByPk(idTipoNotificacion); 
    
    if (!tipoNotificacionDb) return res.status(404).json({ err: "No se encontro el tipo de notificacion: " + idTipoNotificacion});
    
    res.status(200).json(tipoNotificacionDb) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

router.post('/create', (req,res,next) => {
    const { tipoNotificacion } = req.body;
    const tipoNotificacionNew = req.body
    if (!tipoNotificacion ) return res.status(400).json({ err: "Falta TIPO" })
    try{
        TipoNotificacion.create(tipoNotificacionNew)
        .then(res.status(200)
        .send(tipoNotificacionNew))
        // .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

router.put('/put', async (req,res,next) => {
    const { idTipoNotificacion, tipoNotificacion } = req.body;
    const tipoNotificacionNew = req.body
    if (!idTipoNotificacion || !tipoNotificacion ) return res.status(400).json({ err: "Falta el ID || TIPO" })
    try{
    const registro = await TipoNotificacion.findByPk(idTipoNotificacion); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el tipo de notificacion: " + idTipoNotificacion});
    
    TipoNotificacion.update(tipoNotificacionNew, {where: {idTipoNotificacion: idTipoNotificacion}}).then(() => {res.json(tipoNotificacionNew);}).catch(error => res.json(error))

}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })
 
router.delete('/delete/:idTipoNotificacion', async (req,res,next) => {
    
    const { idTipoNotificacion } = req.params;
    if (!idTipoNotificacion ) return res.status(400).json({ err: "Falta el ID" })
    try{
    const registro = await TipoNotificacion.findByPk(idTipoNotificacion); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el tipo de notificacion: " + idTipoNotificacion});
    
    TipoNotificacion.destroy({where: {idTipoNotificacion: idTipoNotificacion}}).then(result => {res.send("El tipo de notificacion fue eliminado");}) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"} );
    }
 })

router.post('/precarga', (req,res,next) => {
    try{
        TipoNotificacion.bulkCreate(datosIniciales)
        .then(res.status(200).send(datosIniciales))
        .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

module.exports = router;
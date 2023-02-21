const { Router } = require('express');

const { Curso, Usuario } = require('../db');

const router = Router();

const datosIniciales=[
    {
        "nombreCurso": "5 B",
        "idUsuario": 2
    },   
    {
        "nombreCurso": "5 A",
        "idUsuario": 2
    },   
    {
        "nombreCurso": "4 A",
        "idUsuario": 2
    }
]

router.get("/all", async (req, res, next) => {
    try {
        let cursoDb = await Curso.findAll()
        res.status(200).json(cursoDb)
    } catch (error) {
        res.status(400).send({error: "La operacion no fue exitosa"})     
    }
})

router.post('/create', async (req,res,next) => {
    const { nombreCurso } = req.body;
    const cursoNew = req.body
    let usuarioExiste =""

    if(req.body.idUsuario){
        usuarioExiste = await Usuario.findByPk(req.body.idUsuario)
        if (!usuarioExiste) return res.status(404).json({ err: "No se encontro el usuario: " + req.body.idUsuario});
    }

    if ( !nombreCurso ) return res.status(400).json({ err: "Falta Nombre de curso" })
    try{
        await Curso.create(cursoNew).then(res.status(200).send(cursoNew))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

router.put('/put', async (req,res,next) => {
    const { idCurso, nombreCurso , idUsuario} = req.body;
    const cursoNew = req.body
    
    if (!idCurso || !nombreCurso || !idUsuario) return res.status(400).json({ err: "Faltan datos" })
  
    if(idUsuario){
        usuarioExiste = await Usuario.findByPk(idUsuario)
        if (!usuarioExiste) return res.status(404).json({ err: "No se encontro el usuario: " + idUsuario});
    }
    try{
    const registro = await Curso.findByPk(parseInt(idCurso)); 
    
    if (!registro) return res.status(404).json({ err: "No se encontro el curso: " + idCurso});
    
    Curso.update(cursoNew, {where: {idCurso: idCurso}}).then(() => {res.status(200).json(cursoNew);}) // comunicacion con la BD M4
    
    
}catch(error){
        res.status(400).json({error: "La operacion no fue exitosa"});
    }
 })

 router.put('/usuario/asignar', async (req,res,next) => {
    const { idCurso, idUsuario} = req.body;
    const cursoNew = req.body

    if (!idCurso || !idUsuario) return res.status(400).json({ err: "Faltan datos" })

    if(idUsuario){
        usuarioExiste = await Usuario.findByPk(idUsuario)
        if (!usuarioExiste) return res.status(404).json({ err: "No se encontro el usuario: " + idUsuario});
    }

    const registro = await Curso.findByPk(parseInt(idCurso)); 
    
     if (!registro) return res.status(404).json({ err: "No se encontro el curso: " + idCurso });
     try {

         Curso.update({ idUsuario: idUsuario }, { where: { idCurso: idCurso } }).then(() => {
             res.status(200).json(
                 {
                     idCurso: registro.idCurso,
                     nombreCurso: registro.nombreCurso,
                     idUsuario: idUsuario,
                     usuario: usuarioExiste.nombreUsuario
                 }
             );
         })


     } catch (error) {
         res.status(400).json({ error: "La operacion no fue exitosa" });
     }
 })

 router.post('/precarga', (req,res,next) => {
    try{
        Curso.bulkCreate(datosIniciales)
        .then(res.status(200).send(datosIniciales))
        .catch(error => res.json(error))
    }catch(error){
        res.status(403).send({error: "La operacion no fue exitosa"})
     }
})

module.exports = router;
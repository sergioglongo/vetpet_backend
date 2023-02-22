const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const AdministratorRoutes = require('./admin')
// const AppointmentRoutes = require('./appointment')
// const NotificationRoutes = require('./notification')
// const OwnerRoutes = require('./owner')
// const PetRoutes = require('./pet')
// const ProductRoutes = require('./product')
// const SaleRoutes = require('./sale')
// const TypeNotificationRoutes = require('./typenotification')
const TypeUserRoutes = require('./typeuser')
const UserRoutes = require('./user')
// const VaccinationRoutes = require('./vaccination')
const VaccineRoutes = require('./vaccine')
// const VeterinarianRoutes = require('./veterinarian')
// const VisitRoutes = require('./visit')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/admin', AdministratorRoutes)
// router.use('/appointment', AppointmentRoutes)
// router.use('/notification', NotificationRoutes)
// router.use('/owner', OwnerRoutes)
// router.use('/pet' , PetRoutes)
// router.use('/product', ProductRoutes)
// router.use('/sale', SaleRoutes)
// router.use('/typenotification', TypeNotificationRoutes)
router.use('/user', UserRoutes)
// router.use('/typeuser', TypeUserRoutes)
// router.use('/vaccination' , vaccinationRoutes)
// router.use('/vaccine', VaccineRoutes)
// router.use('/veterinarian' , VeterinarianRoutes)
// router.use('/visit', visitRoutes)

module.exports = router;
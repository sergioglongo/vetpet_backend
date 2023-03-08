const { Router } = require('express');
const router = Router();
const { User } = require('../db');
const { TypeUser } = require('../db');
const bcrypt = require("bcrypt");
const { Op } = require('sequelize');

const initialData=[
  {
    "user": "Sergio",
    "mailUser": "sergiolongo@gmail.com",
    "password": "1234",
    "idTypeUser": 1,
  },
  {
    "user": "Daniel",
    "mailUser": "daniel@gmail.com",
    "password": "1234",
    "idTypeUser": 2,
  },
  {
    "user": "Juan",
    "mailUser": "juan@gmail.com",
    "password": "1234",
    "idTypeUser": 3,
  },
  {
    "user": "Jorge",
    "mailUser": "jorge@gmail.com",
    "password": "1234",
    "idTypeUser": 3,
  },
 
]

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: TypeUser
        }
      ],
      attributes: { exclude: ['idTypeUser', 'password'] }
    });
    
    // Total number of users
    const totalUsers = users.length;
    
    // Number of users with active status
    const activeUsers = users.filter(user => user.status).length;
    
    // Count of users for each type
    const typeUserCounts = {};
    users.forEach(user => {
      const typeUser = user.TypeUser.typeUser;
      typeUserCounts[typeUser] = typeUserCounts[typeUser] ? typeUserCounts[typeUser] + 1 : 1;
    });
    
    // Obtener la cantidad de usuarios por cada tipo de usuario
    const adminCount = users.filter(user => user['TypeUser.idTypeUser'] === 1).length;
    const clientCount = users.filter(user => user['TypeUser.idTypeUser'] === 2).length;
    const superCount = users.filter(user => user['TypeUser.idTypeUser'] === 3).length;
    const vetCount = users.filter(user => user['TypeUser.idTypeUser'] === 4).length;

    res.status(200).json({
      success: true,
      totalUsers,
      activeUsers,
      typeUserCounts,
      result: users
    });
  } catch (err) {
    res.status(400).json({success: false, error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: TypeUser
        }
      ],
      attributes: { exclude: ['idTypeUser', 'password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: err.message });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const { user, mailUser, password = '', idTypeUser, avatarLink, status } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create the user in the database
    const userCreated = await User.create({
      user,
      mailUser,
      password: hashedPassword,
      avatarLink,
      status,
      idTypeUser,
    });
    res.status(201).json({ userCreated });
  } catch (err) {
    console.log(err);
    res.status(404).json({success: false, error: err.message });
  }
});

router.post("/putUser", async (req, res) => {
  const { idUser, user, mailUser, idTypeUser, status } = req.body;

  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      { user, mailUser, idTypeUser, status },
      { where: { idUser }, returning: true }
    );
    if (rowsUpdated === 0) {
      res.status(404).json({success: false, error: 'User not Found' });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log("usernameOrEmail, pass", req.body);
  try {
    const userData = await User.findOne({
      where: {
        [Op.or]: [{ mailUser: req.body.usernameOrEmail }, { user: req.body.usernameOrEmail }]
      },
      include: [
        {
          model: TypeUser
        }
      ],
      attributes: { exclude: ['idTypeUser'] }
    });
    if (!userData) {
      return res.status(200).json({ success: false, message: "Invalid login credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(200).json({ success: false, message: "Invalid login credentials" });
    }
    // rest of the code for handling successful login
    userData.password = null
    return res.status(200).json({ success: true, result: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/precharge', (req,res) => {
  try{
      User.bulkCreate(initialData)
      .then(res.status(200).send(initialData))
      .catch(error => res.json(error))
  }catch(error){
      res.status(403).send({error: "Error in precharge"})
   }
})
module.exports = router;
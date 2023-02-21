const { Router } = require('express');
const router = Router();
const { User } = require('../db');
const { TypeUser } = require('../db');
const bcrypt = require("bcrypt");

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.findAll({
          include: [
            { 
              model: TypeUser 
            }
          ]
        });
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });
  
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  router.post("/createUser", async (req, res)  => {
    try {
        const { user, mailUser, password, idTypeUser } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the user in the database
        const userCreated = await User.create({
            user,
            mailUser,
            password: hashedPassword,
            idTypeUser,
        });
        res.status(201).json({ userCreated });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err.message });
    }
  });
  
  router.post("/putUser", async (req, res) => {
    const {idUser, user, mailUser, password, idTypeUser } = req.body;
    
    try {
        const [rowsUpdated, [updatedUser]] = await User.update(
            { user, mailUser, password, idTypeUser },
            { where: { idUser }, returning: true }
        );
        if (rowsUpdated === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
  });
  
  router.get("/login", async (req, res) => {
    try {
        const { mailUserOrUser, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { mailUser: mailUserOrUser },
                    { user: mailUserOrUser }
                ],
                password: password
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }
        // rest of the code for handling successful login
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
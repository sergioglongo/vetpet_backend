const { Router } = require('express');
const router = Router();
const { User } = require('../db');

router.get('/getAllUsers', async (req, res) => {
    console.log("User", User);
    try {
        const users = await User.findAll();
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
  
  router.get("/createUser", async (req, res)  => {
    try {
        const { userName, email, password, userType } = req.body;
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the user in the database
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
            userType,
        });
        res.status(201).json({ user });
    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err.message });
    }
  });
  
  router.get("/putUser", async (req, res) => {
    const { userName, email, password, userType } = req.body;
    const userId = req.params.userId;
    try {
        const [rowsUpdated, [updatedUser]] = await User.update(
            { userName, email, password, userType },
            { where: { userId }, returning: true }
        );
        if (rowsUpdated === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating user' });
    }
  });
  
  router.get("/login", async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { userName: emailOrUsername }
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
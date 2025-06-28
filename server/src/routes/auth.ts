import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Do NOT import Request, Response types (let TypeScript infer them)
const authRouter = express.Router();
authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err });
  }
});


authRouter.post('/login', async (req, res): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // ✅ TypeScript-safe handling of possibly undefined password
    const dbPassword: string = user.password || '';
    const valid = await bcrypt.compare(password, dbPassword);
    if (!valid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
      expiresIn: '1d',
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err });
  }
});

export default authRouter;

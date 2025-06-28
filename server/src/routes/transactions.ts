import express from 'express';
import Transaction from '../models/Transaction';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const data = await Transaction.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;

import express from 'express';
import Transaction from '../models/Transaction'; // update path if needed

const router = express.Router();

router.post('/', async (_req, res) => {
  try {
    const transactions = [
      {
        id: 1,
        date: "2024-01-15T08:34:12Z",
        amount: 1500.0,
        category: "Revenue",
        status: "Paid",
        user_id: "user_001",
        user_profile: "https://thispersondoesnotexist.com/"
      },
      {
        id: 2,
        date: "2024-02-21T11:14:38Z",
        amount: 1200.5,
        category: "Expense",
        status: "Paid",
        user_id: "user_002",
        user_profile: "https://thispersondoesnotexist.com/"
      }
      // Add more objects if you like
    ];

    await Transaction.insertMany(transactions);
    res.status(201).json({ message: 'Transactions seeded successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Seeding failed', details: err });
  }
});

export default router;

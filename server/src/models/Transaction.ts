import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  category: String,
  status: String,
  user_id: String,
  user_profile: String
});

export default mongoose.model('Transaction', TransactionSchema);

import React from 'react';
import './TransactionTable.css';

interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

interface Props {
  transactions: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            <td>{tx.id}</td>
            <td>
              <img src={tx.user_profile} alt="avatar" className="profile-pic" />
              {tx.user_id}
            </td>
            <td>${tx.amount.toFixed(2)}</td>
            <td>{tx.category}</td>
            <td>
              <span className={`status ${tx.status.toLowerCase()}`}>{tx.status}</span>
            </td>
            <td>{new Date(tx.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from '../components/Chart';
import './Dashboard.css';

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'All' | 'Paid' | 'Pending'>('All');
  const [activeTab, setActiveTab] = useState<'Dashboard' | 'Transactions' | 'Analytics'>('Dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/transactions')
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredTransactions =
    filter === 'All' ? transactions : transactions.filter((tx) => tx.status === filter);

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i).toLocaleString('default', { month: 'short' });
    const monthly = transactions.filter((tx) => new Date(tx.date).getMonth() === i);
    const revenue = monthly.filter((tx) => tx.category === 'Revenue').reduce((sum, tx) => sum + tx.amount, 0);
    const expense = monthly.filter((tx) => tx.category === 'Expense').reduce((sum, tx) => sum + tx.amount, 0);
    return { month, revenue, expense };
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <aside className="sidebar">
        {/* //<div className="logo">Penta</div> */}
        <ul className="sidebar-nav">
          <li
            className={activeTab === 'Dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('Dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeTab === 'Transactions' ? 'active' : ''}
            onClick={() => setActiveTab('Transactions')}
          >
            Transactions
          </li>
          <li
            className={activeTab === 'Analytics' ? 'active' : ''}
            onClick={() => setActiveTab('Analytics')}
          >
            Analytics
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <div className="topbar">
          <input type="text" placeholder="Search..." className="search-bar" />
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? 'Light' : 'Dark'} Mode
          </button>
          <div className="notification">🔔</div>
          <div
            className="profile-container"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <img
              src={transactions[0]?.user_profile || 'https://thispersondoesnotexist.com/'}
              alt="profile"
              className="topbar-profile-img"
            />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <p><strong>User ID:</strong> {transactions[0]?.user_id}</p>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        {activeTab === 'Dashboard' && (
          <>
            <h1>Dashboard Overview</h1>
            <Chart data={chartData} />
          </>
        )}

        {activeTab === 'Transactions' && (
          <>
            <div className="filter-container">
              <label htmlFor="status-filter">Filter by Status: </label>
              <select
                id="status-filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'All' | 'Paid' | 'Pending')}
              >
                <option value="All">All</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <h1>Recent Transactions</h1>
            <div className="transaction-list">
              {filteredTransactions.map((tx) => (
                <div key={tx._id} className="transaction-card">
                  <img src={tx.user_profile} alt="profile" className="profile-img" />
                  <div>
                    <p>
                      <strong>{tx.category}</strong> - ₹{tx.amount}
                    </p>
                    <p>
                      {new Date(tx.date).toLocaleDateString()} • {tx.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'Analytics' && (
          <>
            <h1>Analytics</h1>
            <Chart data={chartData} />
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

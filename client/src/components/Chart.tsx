import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import './Chart.css';

interface ChartProps {
  data: { month: string; revenue: number; expense: number }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="chart-container">
      <h3>Monthly Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#4caf50" name="Revenue" />
          <Line type="monotone" dataKey="expense" stroke="#f44336" name="Expense" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => {
  return (
    <div className="metric-card">
      <div className="metric-icon">{icon}</div>
      <div className="metric-info">
        <p className="metric-title">{title}</p>
        <p className="metric-value">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
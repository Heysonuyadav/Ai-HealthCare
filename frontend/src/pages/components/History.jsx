import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch history from backend (assuming an endpoint exists)
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://ai-healthcare-orvs.onrender.com/asset/history', { withCredentials: true });
        setHistory(response.data.data || []);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="cyber-grid"></div>
      <div className="scan-line"></div>

      <div className="content-container">
        <div className="page-header">
          <h1>ANALYSIS HISTORY</h1>
          <p>View your past security analyses</p>
        </div>

        {loading ? (
          <div className="loading">Loading history...</div>
        ) : (
          <div className="history-list">
            {history.length === 0 ? (
              <p>No analysis history found.</p>
            ) : (
              history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="item-type">{item.type}</div>
                  <div className="item-date">{new Date(item.createdAt).toLocaleString()}</div>
                  <div className="item-result">{item.result || 'Analysis completed'}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;

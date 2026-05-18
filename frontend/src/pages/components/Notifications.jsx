import React, { useState, useEffect } from 'react';
import './Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New security threat detected in uploaded image.', date: '2026-05-15', read: false },
    { id: 2, message: 'Text analysis completed successfully.', date: '2026-05-14', read: true },
    { id: 3, message: 'System update available.', date: '2026-05-13', read: false },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  return (
    <div className="notifications-page">
      <div className="cyber-grid"></div>
      <div className="scan-line"></div>

      <div className="content-container">
        <div className="page-header">
          <h1>NOTIFICATIONS</h1>
          <p>Stay updated on your security analyses</p>
        </div>

        <div className="notifications-list">
          {notifications.map((notif) => (
            <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
              <div className="notification-content">
                <p>{notif.message}</p>
                <span className="notification-date">{notif.date}</span>
              </div>
              {!notif.read && (
                <button className="mark-read-btn" onClick={() => markAsRead(notif.id)}>
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
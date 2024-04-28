import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Layout2 from '../../components/Layout/Layout2';

const MessageForm = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await onSubmit(message);
      toast.success('Message sent successfully');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '100',
        background: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        width: '50%',
        height: '40%',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
        }}
      >
        &times;
      </button>
      <h2>USER MESSAGE</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', minHeight: '100px', marginBottom: '10px' }}
          placeholder="Messages here....."
          required
        ></textarea>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#32aeb1',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

const MessageIcon = ({ onClick }) => (
  <span
    onClick={onClick}
    style={{
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      color: '#32aeb1',
      fontSize: '24px',
      cursor: 'pointer',
    }}
  >
    <i className="fas fa-envelope"></i>
  </span>
);

const User = () => {
  const [users, setUsers] = useState([]);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  useEffect(() => {
      fetchUsers();
    }, []);
  


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/auth/allusers');
      setUsers(response.data.user);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSendMessage = async (message) => {
    if (!selectedUserId) return;

    try {
      await axios.post(`http://localhost:8081/api/blog/message/${selectedUserId}`, { message });
    } catch (error) {
      throw new Error('Failed to send message');
    }
  };

  return (
    <Layout2>
      <div style={{ padding: '20px' }}>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {users.map(user => (
                <div
                  key={user._id}
                  style={{
                    width: '48%',
                    marginBottom: '20px',
                    position: 'relative',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
                    borderRadius: '5px',
                    padding: '20px',
                    boxSizing: 'border-box',
                  }}
                >
                  <h5>Name: {user.name}</h5>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Address: {user.address}</p>
                  <MessageIcon onClick={() => {
                    setSelectedUserId(user._id);
                    setShowMessageForm(true);
                  }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showMessageForm && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: '1' }}>
          <MessageForm onClose={() => setShowMessageForm(false)} onSubmit={handleSendMessage} />
        </div>
      )}
    </Layout2>
  );
};

export default User;

// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [appliances, setAppliances] = useState([]);
  const [newAppliance, setNewAppliance] = useState('');

  const fetchAppliances = async () => {
    const res = await axios.get('http://localhost:5000/api/appliances');
    setAppliances(res.data);
  };

  const addAppliance = async () => {
    await axios.post('http://localhost:5000/api/appliances', {
      name: newAppliance,
      status: false,
    });
    setNewAppliance('');
    fetchAppliances();
  };

  const toggleStatus = async (id, currentStatus) => {
    await axios.put(`http://localhost:5000/api/appliances/${id}/status`, {
      status: !currentStatus,
    });
    fetchAppliances();
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <input
        value={newAppliance}
        onChange={(e) => setNewAppliance(e.target.value)}
        placeholder="New Appliance Name"
      />
      <button onClick={addAppliance}>Add</button>

      <ul>
        {appliances.map((a) => (
          <li key={a._id}>
            {a.name} - {a.status ? 'On' : 'Off'}
            <button onClick={() => toggleStatus(a._id, a.status)}>Toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import './AgeCalculator.css';

const AgeCalculator = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [entries, setEntries] = useState(() => {
    try {
      const savedEntries = localStorage.getItem('ageEntries');
      return savedEntries ? JSON.parse(savedEntries) : [];
    } catch (error) {
      console.error('Error loading entries:', error);
      return [];
    }
  });
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showError, setShowError] = useState(false);

  // Save to localStorage whenever entries change
  useEffect(() => {
    try {
      localStorage.setItem('ageEntries', JSON.stringify(entries));
    } catch (error) {
      console.error('Error saving entries:', error);
    }
  }, [entries]);

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getDetailedAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    const diff = today - birthDate;
    
    return {
      years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
      days: Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !birthDate) {
      setShowError(true);
      return;
    }
    
    const newEntry = {
      id: Date.now(),
      name,
      birthDate,
      age: calculateAge(birthDate),
      starred: false,
      createdAt: new Date().toISOString()
    };
    
    setEntries(prev => [newEntry, ...prev]);
    setName('');
    setBirthDate('');
  };

  const toggleStar = (id) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, starred: !entry.starred } : entry
    ));
  };

  const handleDelete = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  // Sort entries: starred first, then by creation date
  const sortedEntries = [...entries].sort((a, b) => {
    if (a.starred === b.starred) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return b.starred ? 1 : -1;
  });

  return (
    <div className="container">
      <h1 className="Age__h1">Age Calculator</h1>
      
      <form onSubmit={handleSubmit} className="input-group-Age-calculator">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />
        <button type="submit" className="calculate-btn">
          Add Entry
        </button>
      </form>

      <div className="entries-list">
        {sortedEntries.map(entry => (
          <div key={entry.id} className={`entry ${entry.starred ? 'starred' : ''}`}>
            <div className="entry-info">
              <h4 className='Age__Entry__Name'>{entry.name}</h4>
              <div 
                className="age-display"
                onClick={() => setSelectedEntry(entry)}
              >
                {entry.age} years
              </div>
            </div>
            <div className="entry-actions">
              <button
                className={`star-btn ${entry.starred ? 'active' : ''}`}
                onClick={() => toggleStar(entry.id)}
              >
                ⭐
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(entry.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Error Popup */}
      {showError && (
        <div className="modal-overlay" onClick={() => setShowError(false)}>
          <div className="modal-content error-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="error-header">⚠️ Missing Information</h3>
            <p>Please fill in both name and birth date fields.</p>
            <button
              className="close-btn error-close"
              onClick={() => setShowError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Age Details Popup */}
      {selectedEntry && (
        <div className="modal-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedEntry.name}'s Age Breakdown</h3>
            <div className="age-details">
              {Object.entries(getDetailedAge(selectedEntry.birthDate)).map(([unit, value]) => (
                <div key={unit} className="detail-row">
                  <span className="unit">{unit}</span>
                  <span className="value">{value}</span>
                </div>
              ))}
            </div>
            <button
              className="close-btn"
              onClick={() => setSelectedEntry(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
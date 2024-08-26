import React, { useEffect, useId, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function History_about_me() {
  const navigate = useNavigate();
  const status = useSelector(state => state.auth.is_authenticated);
  const about_me_history = useSelector(state => state.auth.user_data?.about_me_history);
  
  useEffect(() => {
    if (!status && status !== null) navigate('/login');
  }, [status, navigate]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const id = useId()
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-400 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">History</h1>
      <div className="space-y-6">
        {about_me_history && about_me_history.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shouldTruncate = item.length > 100; // Adjust character limit as needed
          const displayText = isExpanded ? item : `${item.slice(0, 100)}...`; // Show truncated text

          return (
            <div 
              key={index} 
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            >
              <p className="mb-4 leading-relaxed" id={id}>{displayText}</p>
              {shouldTruncate && (
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-yellow-300 hover:text-yellow-400 font-semibold focus:outline-none"
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default History_about_me;

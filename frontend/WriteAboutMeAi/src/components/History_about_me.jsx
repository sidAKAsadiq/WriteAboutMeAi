import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function History_about_me() {
  const navigate = useNavigate();
  const status = useSelector(state => state.auth.is_authenticated);
  const about_me_history = useSelector(state => state.auth.user_data?.about_me_history);
  
  useEffect(() => {
    if (!status) navigate('/login');
  }, [status, navigate]);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-2xl font-semibold mb-4">History</h1>
      <div className="space-y-4">
        {about_me_history && about_me_history.map((item, index) => {
          const isExpanded = expandedIndex === index;
          const shouldTruncate = item.length > 100; // Adjust character limit as needed
          const displayText = isExpanded ? item : `${item.slice(0, 100)}...`; // Show truncated text
          
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p className="mb-2">{displayText}</p>
              {shouldTruncate && (
                <button
                  onClick={() => toggleReadMore(index)}
                  className="text-blue-500 hover:underline"
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

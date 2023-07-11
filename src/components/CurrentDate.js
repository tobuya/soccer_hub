import React, { useState, useEffect } from 'react';

const CurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toISOString().slice(0, 10);
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  return <span>{currentDate}</span>;
};

export default CurrentDate;

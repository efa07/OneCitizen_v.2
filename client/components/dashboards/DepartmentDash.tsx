'use client';

import React, { useEffect, useState } from 'react';

const DepartmentDash = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) setUserInfo(JSON.parse(stored));
  }, []);

  if (!userInfo) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Citizen Dashboard</h1>
      <p>Welcome, !</p>
      {/* Add your citizen-specific widgets here */}
    </div>
  );
};

export default DepartmentDash;

import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext';

const Profile = ({currentUser}) => {
  const user = {
    name: 'John Doe',
    bio: 'A passionate developer from California. Loves coding, hiking, and photography.',
    location: 'San Francisco, CA',
    website: 'https://portfolio-eight-rose-19.vercel.app',
    // avatar: 'https://via.placeholder.com/150',
    avatar: 'https://avatars.githubusercontent.com/u/123537410?v=4',
    interests: ['Coding', 'Hiking', 'Photography']
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold mb-2">{currentUser.name}</h1>
          <p className="text-gray-600 text-center mb-4">{currentUser.email}</p>
          <div className="flex flex-col items-center mb-4">
            <p className="text-gray-600"><strong>Mobile:</strong> {currentUser.phone}</p>
            <p className="text-gray-600"><strong>Website:</strong> <a href={user.website} className="text-blue-500" target="_blank" rel="noopener noreferrer">{user.website}</a></p>
            <p className="text-gray-600"><strong>Role: </strong>{currentUser.role==="1"?"Normal":"Admin"} </p>
          </div>
          <div className="flex flex-wrap justify-center">
            {user.interests.map((interest, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded mb-2">{interest}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

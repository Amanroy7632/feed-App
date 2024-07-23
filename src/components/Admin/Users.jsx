import React from 'react';

const Users = ({userData}) => {
    
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👥 Users</h1>
      <div className="bg-white p-4 rounded shadow h-[45vh] overflow-y-scroll">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-[-20px]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userData.map((user,index)=>{
                return <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role==="1"?"Customer":"Admin"}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

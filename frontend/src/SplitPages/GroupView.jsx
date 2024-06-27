import React, { useState, useEffect } from 'react';

const GroupView = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupMembers, setGroupMembers] = useState([]);
  const [billAmount, setBillAmount] = useState('');

  useEffect(() => {
    // Fetch group names from the backend
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    fetch('http://localhost:8000/api/v1/getgroups',{
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => setGroups(response.data))
      .catch((error) => console.error('Error fetching groups:', error));
  }, []);

  const handleGroupClick = (group) => {
    // Set the selected group and fetch members
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    setSelectedGroup(group);
    fetch(`http://localhost:8000/api/v1/groups/${group}/members`,{
      method:'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // Handle members data as needed
        console.log('Members:', response.data);
        setGroupMembers(response.data);
      })
      .catch((error) => console.error('Error fetching members:', error));
  };

  const handleAddBill = () => {
    // Send the bill amount to the backend
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    fetch(`http://localhost:8000/api/v1/groups/${selectedGroup}/add-bill`, {
      method: 'POST',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ totalExpenditure: billAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response as needed
        console.log('Bill added successfully:', data);
      })
      .catch((error) => console.error('Error adding bill:', error));
  };

  const handleSettle = (member) => {
    // Implement the logic to settle the amount for the selected member
    console.log(`Settling amount for ${member}`);
  };

  return (
    <div className="flex ">
      {/* Section => Group name */}
      <div className="w-[400px] h-auto flex flex-col ml-[300px] mt-[100px] rounded-lg bg-gray-300 p-4">
        <h2 className="text-xl font-semibold mb-2 ml-[150px]">Groups</h2>
        <ul>
          {Array.isArray(groups) && groups.map((group, index) => (
            <li
              key={index}
              className={`cursor-pointer mb-2 ${
                selectedGroup === group ? 'text-blue-500' : ''
              }`}
              onClick={() => handleGroupClick(group)}
            >
              {group}
            </li>
          ))}
        </ul>
      </div>

      {/* Section => Group members & split bills */}
      <div className="w-[400px] h-[500px]  flex flex-col ml-9 mt-[100px] rounded-lg bg-gray-300 p-4">
        <h1 className="text-xl  font-semibold mb-2">Group Dashboard</h1>

        {/* Add Bill Form */}
        <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Add Bill Amount:
              </label>
              <input
                type="number"
                className="w-40 p-2 border rounded"
                placeholder="Enter amount"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white p-2 rounded ml-2"
                onClick={handleAddBill}
              >
                Add & Split
              </button>
            </div>

        {selectedGroup && (
          <div>
            <h2 className="text-xl  font-semibold mb-2">{selectedGroup} Members</h2>
            <ul>
              {groupMembers.map((member, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{member.username}</span>
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={() => handleSettle(member)}
                  >
                    Settle Bill
                  </button>
                </li>
              ))}
            </ul>

            
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupView;
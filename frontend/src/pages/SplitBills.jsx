import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupView from '../SplitPages/GroupView';
import { Link } from 'react-router-dom';

const SplitBills = () => {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState('');
  const [friendInputs, setFriendInputs] = useState(['']);

  const handleFriendInputChange = (index, value) => {
    const updatedFriends = [...friendInputs];
    updatedFriends[index] = value;
    setFriendInputs(updatedFriends);
  };

  const addFriendInput = () => {
    setFriendInputs([...friendInputs, '']);
  };

  const removeFriendInput = (index) => {
    const updatedFriends = [...friendInputs];
    updatedFriends.splice(index, 1);
    setFriendInputs(updatedFriends);
  };

  const handleCreateGroup = async () => {
    try {
      // Simulate a backend API endpoint
      const backendEndpoint = 'https://example.com/api/createGroup';

      // Make a POST request to the backend
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupName,
          friends: friendInputs,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle the response from the backend
      const responseData = await response.json();
      console.log('Group created successfully:', responseData);

      // Save data and navigate to the 'group-view' route
      navigate('/group-view', { state: { group: { groupName, friends: friendInputs } } });
    } catch (error) {
      console.error('Error creating group:', error.message);
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded shadow-md w-[400px] mt-[120px] ml-[400px]">
        <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Group Name</label>
            <input
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Add Friends</label>
            {friendInputs.map((friend, index) => (
              <div key={index} className="mb-2 flex">
                <input
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  placeholder={`Friend ${index + 1} username`}
                  value={friend}
                  onChange={(e) => handleFriendInputChange(index, e.target.value)}
                />
                <a
                  href="#"
                  className="ml-2 text-red-500 text-center hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFriendInput(index);
                  }}
                >
                  Delete
                </a>
              </div>
            ))}
            <a
              href="#"
              className="text-blue-500 hover:underline"
              onClick={(e) => {
                e.preventDefault();
                addFriendInput();
              }}
            >
              + Add Friend
            </a>
          </div>
        
          <div className="flex justify-center items-center gap-8">
            <Link to="/group-view" className="hover:text-blue-700">
                View your Group
            </Link>
            <button
                type="button"
                className="bg-blue-500 text-white text-center py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SplitBills;

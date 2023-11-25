import React, { useEffect, useState } from 'react';

const GroupView = ({ groupId }) => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await fetch(`https://example.com/api/getGroup/${groupId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const groupData = await response.json();
        setGroup(groupData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [groupId]);

  if (loading) {
    return <div className='text-green-600 text-2xl m-auto'>Loading...</div>;
  }

  if (error) {
    return <div className='text-red-600 text-2xl m-auto'>Error: {error}</div>;
  }

  if (!group) {
    return <div className='text-white text-2xl m-auto'>No group data available</div>;
  }

  const { groupName, friends } = group;

  return (
    <div className='bg-white text-black'>
      <h2 className="text-2xl font-bold mb-4">Group Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Group Name</label>
        <div className="mt-1 p-2 w-full border rounded-md">{groupName}</div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Friends</label>
        <ul>
          {friends.map((friend, index) => (
            <li key={index} className="mt-1 p-2 w-full border rounded-md">
              {friend}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroupView;

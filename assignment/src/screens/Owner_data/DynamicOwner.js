import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar3 from '../../components/Shop_Owner/Navbar_owner'

function DynamicOwner() {
    const { owner_id } = useParams();
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/owners/${owner_id}`);
        const data = await response.json();
        setOwnerData(data);
      } catch (error) {
        console.error('Error fetching owner data:', error);
      }
    };

    fetchOwnerData();
  }, [owner_id]);

  return (
    <div>
      {ownerData ? (
        <div>
            <Navbar3 owner_id={owner_id}/>
          <h2>Owner Details</h2>
          <p>Name: {ownerData.name}</p>
          <p>Email: {ownerData.email}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading owner data...</p>
      )}
    </div>
  );
}

export default DynamicOwner;

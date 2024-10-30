import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DrugDetailPage() {
  const { drug_name } = useParams();
  const [drugData, setDrugData] = useState(null);
  const [nscData, setNscData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrugData = async () => {
      try {
        const response = await fetch(`/drugs/${drug_name}`);
        const data = await response.json();
        setDrugData(data.rxeui);
        setNscData(data.nsc);
      } catch (error) {
        setError('Unable to fetch drug details.');
      }
    };
    fetchDrugData();
  }, [drug_name]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Drug: {drug_name}</h1>
      {drugData ? <p>RXEUI: {drugData}</p> : <p>Loading RXEUI...</p>}
      <h2>NSC Data</h2>
      {nscData.length ? (
        <ul>
          {nscData.map((nsc, index) => (
            <li key={index}>{nsc}</li>
          ))}
        </ul>
      ) : (
        <p>No NSC data available.</p>
      )}
    </div>
  );
}

export default DrugDetailPage;

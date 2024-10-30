import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`/drugs?name=${searchTerm}`);
      const data = await response.json();
      if (data.length) {
        setResults(data);
        setError(null);
      } else {
        const spellCheck = await fetch(`/spelling?query=${searchTerm}`);
        const spellSuggestions = await spellCheck.json();
        if (spellSuggestions.length) {
          setResults(spellSuggestions);
        } else {
          setError('No results found. Please try another search term.');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a drug"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button onClick={handleSearch}>🔍</button>
      
      {error && <p>{error}</p>}
      <ul>
        {results.map((drug, index) => (
          <li key={index} onClick={() => navigate(`/drugs/${drug.name}`)}>
            {drug.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;

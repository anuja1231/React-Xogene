import React from 'react';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom';
import SearchPage from './SearchPage';
import DrugDetailPage from './DrugDetailsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/drugs/search" element = {<SearchPage />} />
        <Route path="/drugs/:drug_name" elements={<DrugDetailsPage/>} />

      </Routes>
    </Router>
  );
}
 export default App;
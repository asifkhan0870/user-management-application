import Details from 'components/Details';
import Form from 'components/Form';
import List from 'components/List';
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<List/>} />
          <Route path="/users/:id" element={<Details/>} />
          <Route path="/create" element={<Form/>} />
          <Route path="/edit/:id" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

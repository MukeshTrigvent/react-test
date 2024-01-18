import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form1 from './Form1';
import Form2 from './Form2';
import Success from './Success';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Router>
      </header>
    </div>

  );
};

export default App;


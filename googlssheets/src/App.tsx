import React from 'react';
import Toolbar from './components/Toolbar';
import FormulaBar from './components/FormulaBar';
import Spreadsheet from './components/Spreadsheet';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Toolbar />
      <FormulaBar />
      <Spreadsheet />
    </div>
  );
};

export default App;

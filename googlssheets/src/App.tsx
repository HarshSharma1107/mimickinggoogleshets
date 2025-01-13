import Toolbar from "./components/Toolbar";
import Spreadsheet from "./components/Spreadsheet";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Toolbar />
      <Spreadsheet />
    </div>
  );
};

export default App;

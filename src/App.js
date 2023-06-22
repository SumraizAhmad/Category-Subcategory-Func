import logo from './logo.svg';
import './App.css';
import Routing from './routing/Routing';
import  Navbar  from './components/navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routing />
    </div>  
  );
}

export default App;

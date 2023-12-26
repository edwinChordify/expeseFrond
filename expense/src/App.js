import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Register></Register>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/dashboard' element={<Dashboard></Dashboard>} />



      </Routes>

    </div>
  );
}

export default App;

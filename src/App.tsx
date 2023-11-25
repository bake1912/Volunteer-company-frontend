
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './modules/Auth/component/Register';
import { Login } from './modules/Auth/component/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route Component={Register} path='/volunteers/register'/>
        <Route Component={Login} path='/volunteers/login'/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

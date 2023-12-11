
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './modules/Auth/component/Register';
import { Login } from './modules/Auth/component/Login';
import RequestPage from './modules/Request/component/RequestPage';
import ItemPage from './modules/items/component/ItemPage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RequestList from './modules/Request/component/RequestList';
import ResponseList from './modules/Response/ResponseList';
import UserList from './modules/User/UserList';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route Component={Register} path='/volunteers/register' />
            <Route Component={Login} path='/volunteers/login' />
            <Route Component={RequestPage} path='/volunteers/request' />
            <Route Component={RequestList} path='/volunteers/my-requests' />
            <Route Component={ItemPage} path='/volunteers/items' />
            <Route Component={ResponseList} path='/volunteers/my-responses' />
            <Route Component={UserList} path='/volunteers/user' />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

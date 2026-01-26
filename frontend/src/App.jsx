import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// Redux
import { checkAuth } from './redux/slices/userSlice';

// Pages
import Clients from './pages/Clients';
import DadosVenda from './pages/DadosVenda';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path='/clientes' element={<Clients />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/produtos' element={<Products />} />
        </Route>
        <Route path='/nova-venda' element={<DadosVenda />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

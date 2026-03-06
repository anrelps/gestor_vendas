import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

// Redux
import { checkAuth } from './redux/slices/userSlice';

// Pages
import Clients from './pages/Clients';
import Dashboard from './pages/Dashboard';
import EditarPerfil from './pages/EditarPerfil';
import EditarVenda from './pages/EditarVenda';
import Home from './pages/Home';
import Login from './pages/Login';
import NovaVenda from './pages/NovaVenda';
import Products from './pages/Products';
import Vendas from './pages/Vendas';
import RegistroPagamentos from './pages/RegistroPagamentos';

// Components
import Layout from './Layout';
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
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout>
                <Outlet />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route path='/clientes' element={<Clients />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/produtos' element={<Products />} />
          <Route path='/vendas' element={<Vendas />} />
          <Route path='/nova-venda' element={<NovaVenda />} />
          <Route path='/vendas/:id/editar' element={<EditarVenda />} />
          <Route path='/editar-perfil' element={<EditarPerfil />} />
          <Route path='/registros-pagamentos' element={<RegistroPagamentos/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

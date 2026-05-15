import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { checkAuth } from './redux/slices/userSlice';
import Clients from './features/clientes/pages/Clients';
import Dashboard from './features/dashboard/pages/Dashboard';
import EditarPerfil from './features/perfil/pages/EditarPerfil';
import EditarVenda from './features/vendas/pages/EditarVenda';
import Home from './features/auth/pages/Home';
import Login from './features/auth/pages/Login';
import NovaVenda from './features/vendas/pages/NovaVenda';
import Products from './features/produtos/pages/Products';
import Vendas from './features/vendas/pages/Vendas';
import RegistroPagamentos from './features/pagamentos/pages/RegistroPagamentos';
import Layout from './components/layout/Layout';
import ProtectedRoute from './features/auth/components/ProtectedRoute';

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

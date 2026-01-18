import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import logo from "./assets/logo.svg";

// Redux
import { checkAuth } from "./redux/slices/userSlice";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Components
import ClientList from "./components/ClientList";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  // Checagem se o usuario ja esta autenticado
  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: "fa-solid fa-arrows-down-to-people",
    },
    {
      label: "Clientes",
      to: "/clientes",
      icon: "fa-regular fa-address-card",
    },
    {
      label: "Notificações",
      to: "/notificacoes",
      icon: "fa-solid fa-bell-concierge",
    },
    { label: "Livros", to: "/livros", icon: "fa-solid fa-book-bookmark" },
  ];

  const authUser = {
    name: user?.nome || "nome",
    role: user?.empresa?.nome || "empresa",
    editTo: "/perfil/editar",
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar
          logoSrc={logo}
          authUser={authUser}
          navItems={navItems}
          onLogout={() => {
            // limpar token/session aqui
          }}
        />
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Outlet />
                </ProtectedRoute>
              }
            >
              <Route path="/clientes" element={<ClientList />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default App;

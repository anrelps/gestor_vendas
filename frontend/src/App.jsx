// src/App.jsx

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/sidebar';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Sidebar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;

// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import EditClientPopup from '../components/EditClientPopup';

const Home = () => {
    return (
        <div>
            <h1 className='text-4xl font-bold mb-4'>Home Page</h1>
            <Link to='/login'>Login</Link>
            <div className='w-full flex justify-center items-center'>
                <EditClientPopup />
            </div>
        </div>
    );
};
export default Home;

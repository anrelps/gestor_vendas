// src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-4xl font-bold mb-4'>Home Page</h1>
            <Link to='/login'>Login</Link>
        </div>
    );
};
export default Home;

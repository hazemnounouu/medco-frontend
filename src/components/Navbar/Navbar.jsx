import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();

  // Check for token in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserLogin(token);
    } else {
      setUserLogin(null);
    }
  }, [setUserLogin]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Clear token
    setUserLogin(null);
    navigate('/login');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-between px-6 z-10">
      <h1 className="text-3xl font-bold text-[#5CAFE1]">Medco</h1>
      <div className="flex items-center gap-4">
        {userLogin ? (
          <>
            <div className="text-xl text-[#5CAFE1]">Welcome, Admin</div>
            <button
              className="bg-[#5CAFE1] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4A9CB8] transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="text-xl text-[#5CAFE1]">Please Login</div>
            <button
              className="bg-[#5CAFE1] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4A9CB8] transition-all"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

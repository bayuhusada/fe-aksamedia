import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getCurrentUser } from '../utils/auth';

const Dashboard = () => {
  const [user, setUser] = useState(getCurrentUser());

    useEffect(() => {
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-2xl font-bold">Welcome to Dashboard {user?.fullName}</h2>
      </div>
    </>
  );
};

export default Dashboard;

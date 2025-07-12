import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
      return;
    }
    const user = getCurrentUser();
    setName(user?.fullName || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = getCurrentUser();
    const updatedUser = { ...user, fullName: name };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    navigate('/dashboard');
  };

  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Edit Profil</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;

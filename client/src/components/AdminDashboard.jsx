import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (user?.user_metadata?.role !== 'admin') {
        navigate('/');
      }      
      if (error || !user) {
        navigate('/'); // Redirect to login if not authenticated
      } else {
        setUser(user);
      }

      setLoading(false);
    };

    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <p className="text-center mt-10">Checking session...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-700">Welcome, {user.email}</p>

      {/* Add your content management UI below here */}
      <div className="mt-10">
        {/* Example section: */}
        <h2 className="text-xl font-semibold mb-2">Manage Cards</h2>
        {/* You can add a form or editor here */}
      </div>
    </div>
  );
}

export default AdminDashboard;
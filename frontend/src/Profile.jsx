import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from "./NavBar"
import { useAuth } from "./AuthContext"
import { api } from "./api"

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, setUser, logout } = useAuth();

  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName || "", email: user.email || "", password: "" });
    }
  }, [user]);

  if (loading) {
    return (
      <div className='flex flex-col items-center'>
        <NavBar />
        <p className='mt-10'>Checking session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex flex-col items-center'>
        <NavBar />
        <p className='mt-10'>Please <Link to="/signin" className='text-blue-600'>login</Link> first.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError(''); setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const body = { fullName: formData.fullName, email: formData.email };
    if (formData.password) body.password = formData.password;

    const { ok, data } = await api(`/api/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
    if (!ok) { setError(data?.message || "Update failed"); return; }
    setUser(data.user);
    setSuccess("Profile updated");
    setFormData((p) => ({ ...p, password: "" }));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <div className='w-[90%] md:w-1/3 flex flex-col items-center mt-10 gap-3 border border-gray-300 rounded-2xl shadow-2xl p-6'>
        <div className='w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold'>
          {user.fullName?.charAt(0).toUpperCase()}
        </div>
        <h1 className='text-xl font-bold'>{user.fullName}</h1>
        <p className='text-sm text-gray-600'>{user.email} · role: {user.role}</p>
        <p className='text-sm text-gray-600'>Posts: {user.posts ? user.posts.length : 0}</p>

        <form onSubmit={handleSave} className='w-full flex flex-col gap-3 mt-4'>
          <input name='fullName' value={formData.fullName} onChange={handleChange}
            placeholder='Full Name' className='border border-gray-300 rounded-md py-2 px-3' />
          <input name='email' value={formData.email} onChange={handleChange}
            placeholder='Email' className='border border-gray-300 rounded-md py-2 px-3' />
          <input name='password' value={formData.password} onChange={handleChange} type='password'
            placeholder='New password (leave empty to keep)' className='border border-gray-300 rounded-md py-2 px-3' />
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          {success && <p className='text-green-500 text-sm'>{success}</p>}
          <button className='py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>Save changes</button>
        </form>
        <button onClick={handleLogout} className='py-2 w-full bg-gray-200 rounded-md hover:bg-gray-300'>Logout</button>
      </div>
    </div>
  )
}

export default Profile
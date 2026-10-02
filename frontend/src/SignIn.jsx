import React, { useState } from 'react'
import NavBar from './NavBar'
import { Link,useNavigate } from 'react-router-dom'
import { KeyRound, Mail, Eye, EyeOff } from 'lucide-react'
import { useAuth } from './AuthContext'

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.email) newErrors.email = 'Please enter your email';
    if (!formData.password) newErrors.password = 'Please enter your password';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Placeholder success behaviour - replace with real auth call
     try {
      const { ok, data } = await login(formData.email, formData.password);
      if (!ok) {
        setError(data?.message || "Login failed");
        return;
      }
      setSuccess("Signed in successfully");
      navigate("/home");
    } catch {
      setError("Cannot connect to backend.");
    }
  };

  const toggleShowPassword = () => setShowPassword((p) => !p);

  return (
    <div className='flex flex-col items-center'>
      <NavBar />
      <div className='w-[90%] md:w-1/3  flex  flex-col items-center mt-10 gap-2 border-1 border-gray-300  rounded-2xl shadow-2xl'>
        <h1 className='mt-5 text-xl font-bold'>Sign In</h1>
        <p className='text-sm text-gray-700'>Access your account</p>
        <form onSubmit={handleSubmit} className='w-[80%] my-5'>
          <div className='w-[95%] mb-4'>
            <p className='text-sm text-gray-700 font-semibold pb-1.5 '>Email Address</p>
            <div className='flex relative'>
              <input
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='border-1 border-gray-300 bg-gray-50 w-full  rounded-md py-3 px-12 focus:outline-none focus:border-black focus:border-1.8 text-sm duration-200'
                type='text'
                placeholder='sample123'
              />
              <Mail className='absolute top-3 w-5 h-5 left-3 text-blue-400' />
            </div>
            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}

          </div>
          <div className='w-[95%] '>
            <p className='text-sm text-gray-700 font-semibold pb-1.5'>Password</p>
            <div className='flex relative'>
              <input
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='border-1 border-gray-300 bg-gray-50 w-full  rounded-md py-3 px-12 focus:outline-none focus:border-black focus:border-1.8 text-sm duration-200'
                type={showPassword ? 'text' : 'password'}
                placeholder='sample123'
              />
              <KeyRound className='absolute top-3 w-5 h-5 left-3 text-red-400' />
              <button type='button' onClick={toggleShowPassword} className='absolute right-3 top-2.5'>
                {showPassword ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
              </button>
            </div>
            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
          </div >
          <div className='flex justify-between gap-3 w-full mt-4'>
            <div className='flex  gap-1'>
              <input type='checkbox' />
              <p className='text-sm text-gray-800 font-semibold '>Remember me</p>
            </div>
            <div className=''>
              <p className='text-sm text-blue-600 font-semibold hover:cursor-pointer'>Forgot Password?</p>
            </div>
          </div>
          {error && <p className='text-red-500 mt-3'>{error}</p>}
          {success && <p className='text-green-500 mt-3'>{success}</p>}
          <button className='w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 duration-200'>Sign In</button>
          <div className='w-full flex justify-center my-4 border-1 border-gray-200 '></div>

          <p className='text-sm text-center text-gray-700'>Don't have an account?<Link to="/signup" className='text-blue-600 font-semibold hover:cursor-pointer'>Create one here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignIn;
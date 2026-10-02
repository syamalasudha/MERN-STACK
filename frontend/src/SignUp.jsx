import React from 'react'
import NavBar from "./NavBar"
import { Link,useNavigate } from 'react-router-dom'
import { CircleUser } from 'lucide-react';
import { KeyRound } from 'lucide-react';
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from './AuthContext';

// const[var,setVar]=useState('')

// {var && <h1>Var is false</h1>}
const SignUp = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    // numbers.map((num)=>num*num)
    const handleSubmit =async (event) => {
       event.preventDefault();

        let newErrors = {}

        if (!formData.fullName) {
            newErrors.fullName = "Please enter your full Name"
        }
        if (!formData.email) {
            newErrors.email = "Please enter your email"
        }
        if (!formData.password) {
            newErrors.password = "Please enter your password"
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Your passwords did not match"
        }

        try{
            const {ok,data}=await signup (formData.fullName,formData.email,formData.password)
            if(!ok){
                setError(data?.message || "Signup failed")
                return;
            }
            setSuccess("Your acount has been created successfully")
            setFormData({
                fullName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            setTimeout(()=>{
                navigate("/home")
            },800);
        }catch{
            setError("Cannot connect to backend.");

        }
        // if(!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword){
        //     setError("Please fill all the fields")
        // }else if(formData.password !== formData.confirmPassword){
        //     setError("Your passwords did not Match")
        // }else{
        //     setSuccess("Your account is created successfully")
        //     setError("")
        //     setFormData({
        //         fullName:"",
        //         email:"",
        //         password:"",
        //         confirmPassword:""
        //     })

        // }
    }

    const handlePassword = () => {
        setShowPassword((password) => !password)
    }
    const handleConfirmPassword = () => {
        setShowConfirmPassword((password) => !password);
    }
    const handleChange = (event) => {
        setError("")
        setSuccess("")
        setFormData((formData) => ({
            ...formData,
            [event.target.name]: event.target.value
        }))
        setErrors((errors) => ({
            ...errors,
            [event.target.name]: ""
        }))
    }

    return (
        <div className='flex items-center flex-col gap-5'>
            <NavBar />
            <h1 className='text-2xl text-blue-600 font-bold'>Join BlogVerse</h1>
            <p className='text-sm md:text-xl text-gray-600 text-center font-semibold'>Create your account and <br></br> start your Blogging journey today</p>
            <form onSubmit={handleSubmit} className='flex flex-col border-1 border-gray-400 w-[90%] sm:w-[50%] lg:w-1/3 py-7 items-center gap-5 mb-5 rounded-2xl'>
                <div className='w-[90%] flex flex-col gap-2'>
                    <p className='text-md text-gray-700 font-semibold'>Full Name</p>
                    <input
                        value={formData.fullName}
                        onChange={handleChange}
                        type="text"
                        name="fullName"
                        placeholder='Enter your Full Name'
                        className='border-1 border-gray-700 w-full py-4 px-3 rounded-xl focus:outline-none focus:border-purple-500'
                    />
                    {errors.fullName && <p className='text-red-500'>{errors.fullName}</p>}
                </div>
                <div className='w-[90%] flex flex-col gap-2'>
                    <p className='text-md text-gray-700 font-semibold'>Email</p>
                    <input
                        value={formData.email}
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder='Enter your Email'
                        className='border-1 border-gray-700 w-full py-4 px-3 rounded-xl focus:outline-none focus:border-purple-500'
                    />
                    {errors.email && <p className='text-red-500'>{errors.email}</p>}
                </div>
                <div className='w-[90%] flex flex-col gap-2'>
                    <p className='text-md text-gray-700 font-semibold'>Password</p>
                    <div className='relative'>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            type={showPassword ? "password" : "text"}
                            placeholder='Enter your Password'
                            className='pl-12 border-1 border-gray-700 w-full py-4 px-3 rounded-xl focus:outline-none focus:border-purple-500'
                        />
                        <KeyRound className='text-blue-500 absolute top-4 left-3' />
                        <p onClick={handlePassword}>{showPassword ? <Eye className='absolute right-3 top-4' /> : <EyeOff className='absolute right-3 top-4' />}</p>
                    </div>
                    {errors.password && <p className='text-red-500'>{errors.password}</p>}
                </div>
                <div className='w-[90%] flex flex-col gap-2'>
                    <p className='text-md text-gray-700 font-semibold'>Confirm Password</p>
                    <div className='relative'>
                        <input
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm Your Password'
                            className='pl-12 border-1 border-gray-700 w-full py-4 px-3 rounded-xl focus:outline-none focus:border-purple-500'
                        />
                        <KeyRound className='text-blue-500 absolute top-4 left-3' />
                        <p onClick={handleConfirmPassword}>{showConfirmPassword ? <Eye className='absolute right-3 top-4' /> : <EyeOff className='absolute right-3 top-4' />}</p>
                    </div>
                    {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
                </div>
                <div className='flex gap-2 border-1 border-gray-800 w-[90%] py-5 px-4 rounded-xl items-center justify-center'>
                    <input type="checkbox" name="" id="" className='h-5 w-5' />
                    <p>I agree to the Terms of Service and Privacy Policy</p>
                </div>
                {error && <p className='text-red-500'>{error}</p>}
                {success && <p className='text-green-500'>{success}</p>}
                <button type="submit" className='w-[90%] flex justify-center bg-purple-500 py-4 text-white rounded-xl font-semibold gap-3'><CircleUser className=' h-7 w-7' /><p>Create Account</p></button>
                <div className='border-[0.5px] border-gray-400 w-[90%] mt-4'></div>
                <p className='text-gray-700 font-semibold'>Already have an Account?<Link to="/signin" className='text-purple-500'> Sign In here</Link></p>
                <button className='text-gray-700 font-semibold hover:bg-gray-200 py-4 w-[90%] rounded-xl cursor-pointer'>Back to Home</button>
            </form>
        </div>
    )
}

export default SignUp
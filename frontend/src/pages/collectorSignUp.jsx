import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CollectorSignUp = () => {
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3050/api/collector/signup", {
        name,
        phone,
        email,
        password,
        city,
      });

      if (res.status === 201) {
        alert("Collector registered successfully!");
        navigate("/collector-signin");
      }
    } catch (err) {
      setError(err.response.data.message || "Error registering collector");
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8'>
      <div className='relative max-w-md w-full bg-green-50 rounded-2xl shadow-lg p-10'>
        <h2 className='text-center text-3xl font-extrabold text-green-700'>Collector Registration</h2>

        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative' role='alert'>
            <strong className='font-bold'>Error: </strong>
            <span className='block sm:inline'>{error}</span>
          </div>
        )}

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm space-y-4'>
            <div>
              <label htmlFor='name' className='sr-only'>
                Collector Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                className='appearance-none rounded-xl relative block w-full px-4 py-2 border border-green-300 placeholder-gray-400 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500'
                placeholder='Collector Name'
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='phone' className='sr-only'>
                Phone Number
              </label>
              <input
                id='phone'
                name='phone'
                type='text'
                required
                className='appearance-none rounded-xl relative block w-full px-4 py-2 border border-green-300 placeholder-gray-400 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='city' className='sr-only'>
                City
              </label>
              <input
                id='city'
                name='city'
                type='text'
                required
                className='appearance-none rounded-xl relative block w-full px-4 py-2 border border-green-300 placeholder-gray-400 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500'
                placeholder='City'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email Address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='appearance-none rounded-xl relative block w-full px-4 py-2 border border-green-300 placeholder-gray-400 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500'
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='appearance-none rounded-xl relative block w-full px-4 py-2 border border-green-300 placeholder-gray-400 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className='flex items-center justify-between mt-6'>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectorSignUp;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl,token, setToken } = useContext(AppContext);
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          //navigate('/profile');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', {
          password,
          email,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          //navigate('/profile');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = () => {
    setEmail('');
    setPassword('');
    setName('');
    setDropdownVisible(false);
    setState('Login');
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(()=>{
    if (token) {
      navigate('/')
    }

  },[token])

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-md min-w-[340px] sm:min-w-96 text-sm text-zinc-600 flex flex-col gap-3">
        <p className="text-2xl font-semibold">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to continue</p>

        {state === 'Sign Up' && (
          <div>
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div>
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md mt-2"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p>
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Don’t have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-blue-600 underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

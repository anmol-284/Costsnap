import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // console.log(SERVER_URL);
      const response = await fetch(`${SERVER_URL}/userlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success('Login Successful');
      console.log('Login successful:', data);

      document.cookie = `token=${data.token}`;

      onLogin(data.token);

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid credentials');
      toast.error('Error logging in. Please try again later');
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#111418] dark group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-full max-w-[960px] py-5 flex-1">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
              <div className="flex flex-col w-full lg:w-1/2 px-4">
                <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center lg:text-left pb-3 pt-5">Welcome back</h1>
                {error && <div className="text-red-500 text-center lg:text-left mb-4">{error}</div>}
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex flex-col max-w-[480px] flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                    <div className='relative'>
                    <input
                      className="form-input w-full flex min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] pr-12 text-base font-normal leading-normal"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#9dabb8] focus:outline-none"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                    </div>
                  </label>
                </div>
                <div className="flex py-3 w-full">
                  <button
                    className={`flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 ${isLoggingIn ? 'bg-green-500' : 'bg-[#1980e6]'
                      } text-white text-sm font-bold leading-normal tracking-[0.015em]`}
                    onClick={handleLogin}
                  >
                    <span className="truncate">Log in</span>
                  </button>
                </div>
                <p className="text-[#9dabb8] text-sm font-normal leading-normal pb-3 pt-1 text-center lg:text-left underline">
                  <Link to="/forgetpassword">Forgot your password?</Link>
                </p>
                <p className="text-[#9dabb8] text-sm font-normal leading-normal pb-3 pt-1 text-center lg:text-left underline">
                  <Link to="/signup">New to this site? Sign up</Link>
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-1/2">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/055abbe5-1a9b-49aa-979b-79a90b7b804b.png")' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoggingIn(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/usersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      toast.success('Signup Successful');
      console.log('Signup successful:', data);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    
    } catch (err) {
      console.error('Signup failed:', err.message);
      setError('Signup failed');
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
                {/* <h1 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center lg:text-left pb-3 pt-2">Signup</h1> */}
                {error && <div className="text-red-500 text-center lg:text-left mb-4">{error}</div>}
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">FirstName</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="text"
                      placeholder="Enter your firstname"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">LastName</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="text"
                      placeholder="Enter your lastname"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">UserName</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="text"
                      placeholder="Enter your UserName"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex flex-col max-w-[480px] w-full flex-wrap items-end gap-4 py-3">
                  <label className="flex flex-col w-full">
                    <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border border-[#3c4753] bg-[#1c2126] focus:border-[#3c4753] h-14 placeholder:text-[#9dabb8] p-[15px] text-base font-normal leading-normal"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
                <div className="flex py-3 w-full">
                  <button
                    className={`flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 ${
                      isLoggingIn ? 'bg-green-500' : 'bg-[#1980e6]'
                    } text-white text-sm font-bold leading-normal tracking-[0.015em]`}
                    onClick={handleSignup}
                  >
                    <span className="truncate">Signup</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3 h-[500px] w-full lg:w-1/2">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/stability/055abbe5-1a9b-49aa-979b-79a90b7b804b.png")' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

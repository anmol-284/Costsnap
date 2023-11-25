import React, { useState, useEffect } from 'react';

const EmailVerificationPage = () => {
  const [userId, setUserId] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch OTP data from the backend when the component mounts
    fetchOTPFromBackend();
  }, []);

  const fetchOTPFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/verifyOTP'); // Update the endpoint accordingly
      const data = await response.json(); 

      // Set the received OTP in the component state
      setOtp(data.otpFromBackend);
    } catch (error) {
      console.error('Error fetching OTP from backend:', error);
    }
  };

  const handleVerify = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/verifyOTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userId,
          otp: otp,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (result.status === 'VERIFIED') {
        setMessage('OTP Verified Successfully!');
        // You can redirect the user to another page or perform other actions upon successful verification
      } else {
        setMessage(`OTP Verification Failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('An error occurred while verifying OTP. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Email Sent! Check your email for the OTP.</h2>

      <div className="mb-4">
        <label htmlFor="otpInput" className="block mb-2 text-white">
          Enter 4-digit OTP :
        </label>
        <input
          type="text"
          id="otpInput"
          className="border border-gray-300 p-2 rounded"
          maxLength="4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>

      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleVerify}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;

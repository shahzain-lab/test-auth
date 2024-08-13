'use client'
import { useState } from 'react';

export default function ConfirmCode() {
  // State to handle the confirmation code input
  const [code, setCode] = useState('');

  // State to handle form submission
  const [submitted, setSubmitted] = useState(false);

  // Function to handle input change
  const handleChange = (e: any) => {
    setCode(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle confirmation code logic here
    console.log('Confirmation code submitted:', code);
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6 text-center">Confirm Your Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="code">Confirmation Code</label>
            <input
              type="text"
              name="code"
              id="code"
              value={code}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </form>
        {submitted && (
          <div className="mt-4 text-green-600">
            Code confirmed successfully!
          </div>
        )}
      </div>
    </div>
  );
}

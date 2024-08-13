'use client'
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignupOrCode = () => {
  const [isSignedUp, setIsSignedUp] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const router = useRouter()

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try{
        await signUp({
            username: email,
            password: password
        })
        setIsSignedUp(true);
    }catch(err){
        console.log(err)
    }
  };

  const handleCodeSubmit = async (e: any) => {
    e.preventDefault();
    try{
        await confirmSignUp({confirmationCode: code, username: email})
        try{
            await signIn({
                username: email,
                password: password
            })
            router.push('/')
        }catch(err){
            console.log(err)
        }
        console.log('Code submitted:', code);
    }catch(err){
        console.log(err)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      {!isSignedUp ? (
        <form onSubmit={handleSignup}>
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      ) : (
        <form onSubmit={handleCodeSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Code</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="code">
              Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Code
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupOrCode;

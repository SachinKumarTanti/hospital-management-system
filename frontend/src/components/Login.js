import React, { useState } from 'react';
import { Shield, User, Stethoscope, Eye, EyeOff, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', icon: Shield },
    { id: 'patient', label: 'Patient', icon: User },
    { id: 'doctor', label: 'Doctor', icon: Stethoscope },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userEmail', email);
        navigate(`/${data.role}`);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl w-full max-w-md p-8">
        <h2 className="text-center text-3xl font-extrabold text-blue-800 mb-2">HealthCare Portal</h2>
        <p className="text-center text-blue-700 text-sm mb-6">Secure Login</p>

        <div className="flex justify-center gap-3 mb-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedRole === role.id
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white/70 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <role.icon size={16} />
              {role.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 bg-white/60 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              className="peer w-full px-4 pt-5 pb-2 border border-gray-300 bg-white/60 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 hover:text-blue-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-xl transition-all shadow-md"
          >
            Login as {roles.find((r) => r.id === selectedRole)?.label}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-900">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-blue-700 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            role: 'patient', // Default role for signup
          }),
        });
        if (response.ok) {
          navigate('/login');
        } else {
          const errorData = await response.json();
          console.log('Error data:', errorData); // Add this line to log the error data
          setErrors({ ...errors, submit: errorData.error });
        }
      } catch (error) {
        setErrors({ ...errors, submit: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <>
  <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4 py-12">
    <div className="w-full max-w-lg bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 p-8">
      <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-1">Create Your Account</h2>
      <p className="text-sm text-blue-700 text-center mb-6">Sign up as a Patient</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {["firstName", "lastName"].map((field) => (
            <div key={field} className="relative">
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder=" "
                required
                className="peer w-full px-4 pt-5 pb-2 rounded-md border border-gray-300 bg-white/60 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label
                htmlFor={field}
                className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
              >
                {field === "firstName" ? "First Name" : "Last Name"}
              </label>
              {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
            </div>
          ))}
        </div>

        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
            className="peer w-full px-4 pt-5 pb-2 rounded-md border border-gray-300 bg-white/60 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
          >
            Email
          </label>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {["password", "confirmPassword"].map((field, i) => (
          <div key={field} className="relative">
            <input
              id={field}
              name={field}
              type={(i === 0 ? showPassword : showConfirmPassword) ? "text" : "password"}
              value={formData[field]}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full px-4 pt-5 pb-2 rounded-md border border-gray-300 bg-white/60 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
              htmlFor={field}
              className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              {field === "password" ? "Password" : "Confirm Password"}
            </label>
            <button
              type="button"
              onClick={() => i === 0 ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-4 text-gray-500 hover:text-blue-600"
            >
              {(i === 0 ? showPassword : showConfirmPassword) ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
          </div>
        ))}

        {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}

        <button
          type="submit"
          className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-all shadow-md"
        >
          Create Account
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-blue-900">
        Already have an account?{' '}
        <span
          onClick={() => navigate('/login')}
          className="text-blue-700 font-semibold cursor-pointer hover:underline"
        >
          Log in
        </span>
      </p>
    </div>
  </div>
  </>
);
}

export default SignUp
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-forestGreen mb-2">
            Welcome Back
          </h1>
          <p className="text-charcoal/70">
            Sign in to your AARIVIO account
          </p>
        </div>

        <div className="bg-white rounded-lg border border-warmSand/50 p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-charcoal/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-forestGreen border-warmSand rounded focus:ring-forestGreen"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm text-forestGreen hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-charcoal/70 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-forestGreen hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

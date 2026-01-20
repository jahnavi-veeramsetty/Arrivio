import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  const backgroundImage = 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  return (
    <div className="min-h-screen bg-softWhite flex">
      {/* Left Panel - Image with Overlay (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-center text-white max-w-md">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6 drop-shadow-lg">
              Arrive. Settle in. Start Living.
            </h2>
            <p className="text-lg text-white/90 drop-shadow-md font-body">
              Join thousands of international professionals who found their home with ARRIVIO.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form (Desktop) / Full Width (Mobile) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-heading font-bold text-forestGreen">
                ARRIVIO
              </span>
            </Link>
          </div>

          <SignupForm />
        </div>
      </div>

      {/* Mobile Banner (Small decorative banner on mobile) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-32 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React from 'react';
import AppNavbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 position-relative">
      {/* Animated Background */}
      <div className="animated-bg position-fixed w-100 h-100" style={{ zIndex: -1 }}>
        <div className="bg-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="position-relative" style={{ zIndex: 1 }}>
        <AppNavbar />
        <main className="flex-grow-1">
          {children}
        </main>
        <Footer />
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .animated-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        
        .bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(1px);
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Ensure content is readable */
        main {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(2px);
          border-radius: 10px;
          margin: 10px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        /* Special styling for hero section */
        .hero-section {
          background: transparent !important;
          backdrop-filter: none !important;
          border-radius: 0 !important;
          margin: 0 !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
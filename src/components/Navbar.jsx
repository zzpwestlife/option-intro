import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../nav-items";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-3">
              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-lg">O</span>
              </div>
            </div>
            <h1 className="text-white text-xl font-bold">期权入门指南</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.to}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {item.icon}
                  <span className="ml-2">{item.title}</span>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

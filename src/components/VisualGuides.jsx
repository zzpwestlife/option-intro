import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { visualGuides } from '../data/visualGuidesData';

const VisualGuides = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImg(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          核心概念图解
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visualGuides.map((guide, index) => (
                                    <motion.div
              key={index}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImg(guide.image)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedImg(guide.image);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View image: ${guide.title}`}
              layoutId={`card-image-container-${index}`}
            >
              <motion.img src={guide.image} alt={guide.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{guide.title}</h3>
                <p className="text-gray-600">{guide.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setSelectedImg(null)}
            >
              <motion.img
                src={selectedImg}
                alt="Enlarged view"
                className="max-w-full max-h-full object-contain"
                layoutId={`card-image-container-${visualGuides.findIndex(g => g.image === selectedImg)}`}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default VisualGuides;
import React from 'react';
import { motion } from 'framer-motion';

const EnhancedCard = ({ title, content, image,onClickHandler }) => {
  return (
    <motion.div 
      className="card-wrap m-4 cursor-pointer"
      style={{ 
        perspective: '800px',
        transformStyle: 'preserve-3d',
      }}
      whileHover="hover"
      onClick={onClickHandler}
    >
      <motion.div 
        className="card relative w-60 h-80 bg-[#333] overflow-hidden rounded-xl"
        variants={{
          hover: {
            boxShadow: [
              'rgba(255, 255, 255, 0.2) 0 0 40px 5px',
              'rgba(255, 255, 255, 1) 0 0 0 1px',
              'rgba(0, 0, 0, 0.66) 0 30px 60px 0',
              'inset #333 0 0 0 5px',
              'inset white 0 0 0 6px'
            ].join(', ')
          }
        }}
        initial={{
          boxShadow: [
            'rgba(0, 0, 0, 0.66) 0 30px 60px 0',
            'inset #333 0 0 0 5px',
            'inset rgba(255, 255, 255, 0.5) 0 0 0 6px'
          ].join(', ')
        }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          className="card-bg absolute inset-[-20px] bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` ,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat" }}
          variants={{
            hover: { opacity: 0.8 }
          }}
          initial={{ opacity: 0.5 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
        <motion.div 
          className="card-info absolute inset-x-0 bottom-0 p-5 text-white"
          variants={{
            hover: { y: 0 }
          }}
          initial={{ y: '40%' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-2" style={{ textShadow: 'rgba(0, 0, 0, 0.5) 0 10px 10px' }}>{title}</h2>
          <motion.p 
            className="text-sm leading-relaxed"
            variants={{
              hover: { opacity: 1 }
            }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ textShadow: 'rgba(0, 0, 0, 1) 0 2px 3px' }}
          >
            {content}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedCard;
import React, { useState, useEffect } from 'react';
import { Circles } from 'react-loader-spinner';
import TeamSection from './TeamSection';

const AboutUs = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Circles
            visible={true}
            height="200"
            width="200"
            ariaLabel="circles-loading"
            color="black"
          />
        </div>
      ) : (
        <TeamSection />
      )}
    </div>
  );
};

export default AboutUs;

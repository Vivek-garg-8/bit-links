import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">About BitLinks</h1>
        <p className="text-lg text-gray-700">
          BitLinks is a simple, fast, and reliable URL shortening service created to make sharing links easier.
          This project is built with the latest web technologies including Next.js, React, and Tailwind CSS, all powered by a MongoDB database.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
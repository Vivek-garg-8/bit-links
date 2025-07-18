"use client";

import React, { useEffect } from 'react';

const GitHubPage = () => {
  useEffect(() => {
    window.location.href = 'https://github.com/Vivek-garg-8/bit-links';
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">Redirecting to GitHub...</h1>
        <p className="text-lg text-gray-700">
          Please wait while we redirect you to the project repository.
        </p>
      </div>
    </div>
  );
};

export default GitHubPage;
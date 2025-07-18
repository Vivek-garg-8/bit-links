"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const generate = async () => {
    // Reset states on new generation
    setLoading(true);
    setError("");
    setMessage("");
    setGenerated("");

    if (!url || !shortUrl) {
      setError("Both URL and Short URL fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          shorturl: shortUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "An error occurred.");
      }
      
      if (result.success) {
        const host = process.env.NEXT_PUBLIC_HOST || window.location.origin;
        setGenerated(`${host}/${shortUrl}`);
        setMessage(result.message);
        setUrl("");
        setShortUrl("");
      } else {
        setError(result.message);
      }

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4 shadow-lg">
      <h1 className="font-bold text-2xl text-center text-purple-800">Generate your short URL</h1>
      <div className="flex flex-col gap-3">
        <input
          value={url}
          className="bg-white px-4 py-2 focus:outline-purple-600 rounded-md border-2 border-transparent focus:border-purple-500"
          type="url"
          placeholder="Enter your long URL (e.g., https://...)"
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <div className="flex items-center">
            <span className="text-gray-500 bg-gray-200 p-2 rounded-l-md border-2 border-r-0 border-transparent">{process.env.NEXT_PUBLIC_HOST || 'your-domain.com'}/</span>
            <input
              value={shortUrl}
              className="bg-white px-4 py-2 focus:outline-purple-600 rounded-r-md border-2 border-l-0 border-transparent focus:border-purple-500 w-full"
              type="text"
              placeholder="your-custom-alias"
              onChange={(e) => setShortUrl(e.target.value)}
              disabled={loading}
            />
        </div>
        <button onClick={generate} className="bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg p-3 py-2 font-bold rounded-lg cursor-pointer text-white my-3 disabled:bg-purple-400 disabled:cursor-not-allowed" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
        
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>}

        {message && !error && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success! </strong>
          <span className="block sm:inline">{message}</span>
        </div>}
        
        {generated && (
          <div className="mt-4 p-4 bg-purple-200 rounded-lg text-center">
            <span className="font-bold text-lg text-purple-900">Your Link:</span>
            <code className="block mt-2">
              <Link target="_blank" href={generated} className="text-purple-700 hover:underline break-all">
                {generated}
              </Link>
            </code>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shorten;

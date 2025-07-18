"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

const Shorten = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shorturl": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
            setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`);
            seturl("");
            setshorturl("");
        }
        // Use a more user-friendly notification instead of alert()
        // For simplicity, we'll keep it, but a modal or toast would be better.
        alert(result.message);
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generate your short URL</h1>
      <div className="flex flex-col gap-2">
        <input
          value={url}
          className="bg-white px-4 py-2 focus:outline-purple-600 rounded-md"
          type="text"
          placeholder="Enter your URL"
          onChange={e => { seturl(e.target.value) }}
        />
        <input
          value={shorturl}
          className=" bg-white px-4 py-2 focus:outline-purple-600 rounded-md"
          type="text"
          placeholder="Enter your preferred short URL text"
          onChange={e => { setshorturl(e.target.value) }}
        />
        <button onClick={generate} className="bg-purple-500 shadow-lg p-3 py-1 font-bold rounded-lg cursor-pointer text-white my-3">
          Generate
        </button>
        {generated && <>
          <span className="font-bold text-lg ">Your Link </span>
          <code>
            <Link target="_blank" href={generated}>{generated}</Link>
          </code>
        </>}
      </div>
    </div>
  );
};

export default Shorten;

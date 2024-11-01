// src/ChuckNorrisJoke.js
import React, { useState, useEffect } from 'react';

const ChuckNorrisJoke = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/random');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJoke(data.value);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Chuck Norris Joke</h1>
      <p>{joke}</p>
      <button onClick={() => window.location.reload()}>Get Another Joke</button>
    </div>
  );
};

export default ChuckNorrisJoke;

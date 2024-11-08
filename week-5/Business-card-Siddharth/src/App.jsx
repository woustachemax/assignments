import React from 'react';
import './App.css';

function App({ name, description, interests, socialLinks }) {
  return (
    <div id="skeleton">
      <h1 id="name">{name}</h1>
      <p>{description}</p>
      <h2>Interests</h2>
      <ul>
        {interests.map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
      <a href={socialLinks.linkedin}>
        <button className="buttons">LinkedIn</button>
      </a>
      <a href={socialLinks.twitter}>
        <button className="buttons">Twitter</button>
      </a>
    </div>
  );
}

export default App;

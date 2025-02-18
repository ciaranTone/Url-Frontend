import React, {useState} from 'react';
import UrlForm from './components/UrlForm';
import GetUrls from './components/GetUrls';
import './App.css';

function App(){
   const [shortenedUrl, setShortenedUrl] = useState('');
  return(
    <div className='App'>
    <header className='header'>
      <h1 className={"App-header"}>URL Shortener</h1>
      {<UrlForm onShorten={setShortenedUrl}/> }
      {shortenedUrl &&(
        <div>
          <h2>Shortened URL:</h2>
          <a href={shortenedUrl} target="_blank" rel="no opener noreferrer">{shortenedUrl}</a>
        </div>
      )}
    </header>
  { <GetUrls/>}
  </div>
  );
};

export default App;

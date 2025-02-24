import React, {useState} from 'react';
import UrlForm from './components/UrlForm';
import GetUrls from './components/GetUrls';
import './App.css';

function App(){
   const [shortenedUrl, setShortenedUrl] = useState('');
   const [updateUrl, setUpdateUrls] = useState('');
  return(
    <div className='App'>
    <header className='header'>
      <h1 className={"App-header"}>URL Shortener</h1>
      {<UrlForm onShorten={setShortenedUrl}/> }
      {shortenedUrl &&(
        <div>
          <h2>Shortened URL:</h2>
          {/* <a href={shortenedUrl} target="_blank" rel="no opener noreferrer">{shortenedUrl}</a> */}
          <div className='displayShort'>
            <p>http://localhost:8080/url-shortener/{shortenedUrl}</p>
          </div>
          <button className='copyButton'>Copy</button>
        </div>
      )}
    </header>
    <h2>Update</h2>
  {<GetUrls/>}
  </div>
  );
};

export default App;

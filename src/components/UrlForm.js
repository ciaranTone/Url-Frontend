import React, { useState } from 'react';
import axios from 'axios';
import GetUrls from './GetUrls';
const UrlForm = ({ onShorten }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        var userInput = document.getElementById('alias').value;
        event.preventDefault();
        try {

            if (!!userInput) {
                const response = await axios.post("http://localhost:8080/url-shortener/alias", { originalUrl, shortenedUrl, headers: { 'Content - Type': 'application/json' } })
                setOriginalUrl(originalUrl);
                setShortenedUrl(shortenedUrl);
                //onShorten(response.data);
                onShorten(shortenedUrl);
                console.log(response.data);
            }
            else {
                const response = await axios.post("http://localhost:8080/url-shortener/short-url", { originalUrl, headers: { 'Content - Type': 'application/json' } })
                setOriginalUrl(originalUrl);
                onShorten(response.data);
                console.log("Short url used");
            }
        } catch (error) {
            setError('Failed')
        }
    }



    return (
        <form className='form' onSubmit={handleSubmit}>
            <input
                className='enterUrl'
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder='Enter URL'
                required
            />
            <input
                id='alias'
                className='alias'
                value={shortenedUrl}
                onChange={(e) => setShortenedUrl(e.target.value)}
                type='text'
                placeholder='Alias'
            />
            <button className='button' type="submit">
                Shorten
            </button>
            <div>
            <input
                
            />
            </div>

        </form>
    )
}

export default UrlForm;
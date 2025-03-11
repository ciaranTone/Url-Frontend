import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = ({ onShorten }) => {
    const [originalUrl, setOriginalUrl] = useState('');//State to set original urls
    const [shortenedUrl, setShortenedUrl] = useState('');//State to set shortened urls
    const [error, setError] = useState('');


    //Submit logic
    const handleSubmit = async (event) => {
        //Variable to determine if alias box is being used
        var userInput = document.getElementById('alias').value;
        //Prevents refresh on submit
        event.preventDefault();
        try {
            //Check to see if alias box is being used
            //Alias box being used
            if (!!userInput) {
                //Api to retrieve method associated
                const response = await axios.post("http://localhost:8080/url-shortener/alias", { originalUrl, shortenedUrl, headers: { 'Content - Type': 'application/json' } })
                //set original url 
                setOriginalUrl(originalUrl);
                //set alias 
                setShortenedUrl(shortenedUrl);
                //Display shortened url
                onShorten(shortenedUrl);
                console.log(response.data);
            }
            else {
                //Alias box not being used
                //Api to retrieve method associated
                const response = await axios.post("http://localhost:8080/url-shortener/short-url", { originalUrl, headers: { 'Content - Type': 'application/json' } })
                //set original url 
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
                id='url-input'
                className='enterUrl'
                type="url"
                value={originalUrl}//Bind state to input
                onChange={(e) => setOriginalUrl(e.target.value)}//Updates input box
                placeholder='Enter URL'
                required
                
            />
            <input
                id='alias'
                className='alias'
                value={shortenedUrl}//Bind state to input
                onChange={(e) => setShortenedUrl(e.target.value)}//Updates input box 
                type='text'
                placeholder='Alias'
            />
            <button id='shorten-button' className='button' type="submit">
                Shorten
            </button>
        </form>
    )
}

export default UrlForm;
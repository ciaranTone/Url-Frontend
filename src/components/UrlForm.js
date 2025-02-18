import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = ({onShorten}) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [alias, setAlias] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        var userInput = document.getElementById('alias').value;
        event.preventDefault();
    try {
        const response = await axios.post("http://localhost:8080/url-shortener/alias",{originalUrl, alias, headers: {'Content - Type': 'application/json'}})
        setOriginalUrl(originalUrl);
        setAlias(alias)
        onShorten(response.data);
        console.log(response.data);
        // if(!!userInput){
        //     const response = await axios.post("http://localhost:8080/url-shortener/alias",{originalUrl, headers: {'Content - Type': 'application/json'}})
        //     setOriginalUrl(originalUrl);
        //     onShorten(response.data);
        //     console.log("Alias used");
        //     //alert('Alias used');
        // }
        // else{
        //     const response = await axios.post("http://localhost:8080/url-shortener/short-url",{originalUrl, headers: {'Content - Type': 'application/json'}})
        //     setOriginalUrl(originalUrl);
        //     onShorten(response.data);
        //     console.log("Short url used");
        // }
      }catch (error) {
        setError('Failed')
      }
    }



    return(
        <form  className='form' onSubmit={handleSubmit}>
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
                value={alias}
                onChange={(g) => setAlias(g.target.value)}
                type='text'
                placeholder='Alias'                
            />
            <button className='button' type="submit">
                Shorten
            </button>
            
        </form>
    )
}

export default UrlForm;
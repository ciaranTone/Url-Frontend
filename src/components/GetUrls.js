// src/components/UrlList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import ToggleInput from './UpdateUrls';

const GetUrls = () => {
    const [urls, setUrls] = useState([]);// State to hold the list of URLs
    const [inputBox, setInputBox] = useState(false);
    const [update, isUpdate] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');

    // useEffect hook to fetch URLs when the component mounts
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                // Make a GET request to fetch all URLs
                const response = await axios.get('http://localhost:8080/url-shortener');
                setUrls(response.data);
            } catch (error) {
                console.error('Error fetching URLs', error);
            }
        };
        fetchUrls();
    }, []);

    const deleteUrl = async (id) => {
        try {

            await axios.delete(`http://localhost:8080/url-shortener/delete/${id}`);

            setUrls(urls.filter(url => url.id !== id));
        } catch (error) {
            console.error('Error deleting URL', error);
        }
    };

    const getUrl = async (id) => {
        try {
        setInputBox(!inputBox);
        await axios.get(`http://localhost:8080/url-shortener/get/${id}`);
        setUrls(urls.filter(url => url.id === id));
        } catch (error) {
            console.error('Error getting URL', error);
        }
    };

    const updateUrl = async (id) => {
        var userInput = document.getElementById('update').value;
        try{
            
            if(!!userInput){
                const response = await axios.put(`http://localhost:8080/url-shortener/updateShort/${id}`, {shortenedUrl,  headers: { 'Content - Type': 'application/json' }})
                setShortenedUrl(shortenedUrl);
                console.log(response.data);
            }
            else{
                const response = await axios.put(`http://localhost:8080/url-shortener/updateOriginal/${id}`, {originalUrl,  headers: { 'Content - Type': 'application/json' }})
                setOriginalUrl(originalUrl);
                console.log(response.data);
            }

        }catch(error){
            console.error("That did not work", error);
        }
    }


    return (
        <div className="display">
            <div className="App-header">
                <h2>Shortened URLs</h2>
            </div>
            <div>
                <table className='table'>
                    <tr className='tr'>
                        <th className='th'>Short Url</th>
                        <th className='th'>Original Url</th>
                    </tr>
                    <tr className='tr'>
                        <td className='td'>
                            <ol className='ol'>
                                {urls.map((url) => (
                                    <li className='li' key={url.id}>
                                        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="Shortened-Url">
                                            {"http://localhost:8080/url-shortener/" + url.shortenedUrl}
                                        </a>
                                        <button onClick={() => deleteUrl(url.id)}>Delete</button>
                                         {<button className='edit'onClick={() => getUrl(url.id)}>Edit</button>}
                                         {inputBox && (
                                            <>
                                            <input
                                                className='update'
                                                value={shortenedUrl}
                                                onChange={(e) => setShortenedUrl(e.target.value)}
                                                placeholder='Update Url'
                                            ></input>
                                            < button id='update' onClick={() => updateUrl(url.id)}>Update</button>
                                            </>
                                         )}
                                        
                                    </li>
                                ))}
                            </ol>
                        </td>
                        <td className='td'>
                            <ol>
                                {urls.map((url) => (
                                    <li className='li' key={url.id}>
                                        <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" className="Shortened-Url">
                                            {url.originalUrl}
                                        </a>
                                        {<button className='edit'onClick={() => getUrl(url.id)}>Edit</button>}
                                            {inputBox && (
                                            <>
                                            <input
                                                className='updateOriginalInput'
                                                value={originalUrl}
                                                onChange={(e) => setOriginalUrl(e.target.value)}
                                                placeholder='Update Url'
                                            ></input>
                                            < button onClick={() => updateUrl(url.id)}>Update</button>
                                            </>
                                         )}
                                    </li>
                                ))}
                            </ol>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );

};

export default GetUrls;
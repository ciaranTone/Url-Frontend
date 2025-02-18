// src/components/UrlList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const GetUrls = () => {
    const [urls, setUrls] = useState([]);// State to hold the list of URLs

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
                                            {url.shortenedUrl}
                                        </a>
                                        <button onClick={() => deleteUrl(url.id)}>Delete</button>
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
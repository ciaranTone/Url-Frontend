// src/components/UrlList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const GetUrls = () => {
    //Uset States
    const [urls, setUrls] = useState([]);// State to hold the list of URLs
    const [inputBox, setInputBox] = useState(false);//State to trigger input box
    const [shortenedUrl, setShortenedUrl] = useState(''); //State to set shortened urls
    const [originalUrl, setOriginalUrl] = useState('');//State to set original urls
    const [showUrls, setShowUrls] = useState(false);

    // useEffect hook to fetch URLs when the component mounts
    //Fetch urls in database. Allows for aoutomatic updates
    useEffect(() => { 
        const fetchUrls = async () => {
            try {
                // Make a GET request to fetch all URLs
                const response = await axios.get('http://localhost:8080/url-shortener');
                //Update state with fetched data
                setUrls(response.data);
            } catch (error) {
                console.error('Error fetching URLs', error);
            }
        };
        fetchUrls();
    }, []);

    //Delete url by a specific id 
    const deleteUrl = async (id) => {
        try {

            await axios.delete(`http://localhost:8080/url-shortener/delete/${id}`);
            //Returns url based on the id
            setUrls(urls.filter(url => url.id !== id));
        } catch (error) {
            console.error('Error deleting URL', error);
        }
    };

    //Gets url by a specific id 
    const getUrl = async (id) => {
        try {
        //Display input box 
        setInputBox(!inputBox);
        //Use get by id method in backend 
        await axios.get(`http://localhost:8080/url-shortener/get/${id}`);
        //Return url based on id 
        setUrls(urls.filter(url => url.id === id));
        } catch (error) {
            console.error('Error getting URL', error);
        }
    };

    //Update short and original urls
    const updateUrl = async (id) => {
        //variable to check if shortened url box is being used
        var userInput = document.getElementById('update').value;
        try{
            //Check to see if box is being used 
            if(!!userInput){
                //if it is not empty update shortened url by id
                const response = await axios.put(`http://localhost:8080/url-shortener/updateShort/${id}`, {shortenedUrl,  headers: { 'Content - Type': 'application/json' }})
                //Update state with new data 
                setShortenedUrl(shortenedUrl);
                console.log("Short url updated");
            }
            else{
                //if box is empty update original url
                const response = await axios.put(`http://localhost:8080/url-shortener/updateOriginal/${id}`, {originalUrl,  headers: { 'Content - Type': 'application/json' }})
                //Update state with new data 
                setOriginalUrl(originalUrl);
                console.log("Original url updated");
            }
            window.location.reload();
        }catch(error){
            console.error("That did not work", error);
        }
    }

    const showUrlsTable = () => {
        setShowUrls(!showUrls)
    }

    return (
        <div className="display">
            <center>{<button className='showUrls-button' onClick={showUrlsTable}>Saved Urls</button>}</center>  
            {showUrls && (
                <>
                <div className="App-header">
                    <h2 className='shortHeader'>Shortened URLs</h2>
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
                                                {/* Delete Button */}
                                                <button className='delete-button' onClick={() => deleteUrl(url.id)}><i class="fa fa-trash"></i></button>
                                                {/* Edit Button */}
                                                {<button className='edit-button' onClick={() => getUrl(url.id)}><i class="fa fa-edit"></i></button>}
                                                {inputBox && (
                                                    <>
                                                    <input
                                                        id='update' 
                                                        className='update'
                                                        value={shortenedUrl}
                                                        onChange={(e) => setShortenedUrl(e.target.value)}
                                                        placeholder='Update Url'
                                                    ></input>
                                                        < button className='update-button' onClick={() => updateUrl(url.id)}><i class="fa fa-save"></i></button>
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
                                                {/* Edit Button */}
                                                {<button className='edit-button' onClick={() => getUrl(url.id)}><i class="fa fa-edit"></i></button>}
                                                    {inputBox && (
                                                    <>
                                                    <input
                                                        className='updateOriginalInput'
                                                        value={originalUrl}
                                                        onChange={(e) => setOriginalUrl(e.target.value)}
                                                        placeholder='Update Url'
                                                    ></input>
                                                        < button className='update-button' onClick={() => updateUrl(url.id)}><i class="fa fa-save"></i></button>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </td>
                            </tr>
                        </table>
                    </div>
                        </>
                    )}

        </div>
    );

};

export default GetUrls;
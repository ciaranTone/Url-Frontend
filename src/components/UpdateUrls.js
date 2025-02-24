import React, { useState } from "react";
import axios from "axios";
function ToggleInput(){
    const [inputBox, setInputBox] = useState(false);
    const [urls, setUrls] = useState([]);
    const [originalUrl, setOriginalUrl] = useState('');

    const handleClick = async (id) =>{
        try{
        //setInputBox(!inputBox);
        await axios.get(`http://localhost:8080/url-shortener/get/${id}`);
        setUrls(urls.filter(url => url.id === id));
        }catch(error){
            console.error("That didnt work", error);
        }
    };

    // const handleUpdate = async(id) =>{
    //     try{
    //         await axios.put(`http://localhost:8080/url-shortener/update/${id}`)
    //         setOriginalUrl(originalUrl);
            

    //     }catch(error){
    //         console.log("That 100% didnt work");
    //     }
    // }

    return(
        <div>
            <button onClick={() => handleClick(url.id)}>
                {inputBox}Edit
            </button>

            {inputBox && (
                <>
                <input placeholder="text"></input>
                <button>Update</button>
                </>
            )}
        </div>
    )
}

export default ToggleInput;

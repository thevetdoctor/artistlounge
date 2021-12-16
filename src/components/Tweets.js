/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

export default function Tweets({tweets, baseUrl, sync, setSync, apiCallHook}) {
    const [status, setStatus] = useState(false);
    const [tweet, setTweet] = useState('');
    const [error, setError] = useState('');
    const [formActive, setFormActive] = useState(false);

    const handleChange = (e) => {
        setTweet(e.target.value);
        setError('');
        setStatus(false);
    }

    const handleFormActive = () => {
        setFormActive(!formActive);
        setError('');
        setStatus(false);
    }

    const sendTweet = async() => {
        if(!tweet) {
            setError('Please enter some text!');
            // setTweet('Input required');
            return;
        }
        const res = await axios({
            method: 'POST',
            url: `${baseUrl}/comments`,
            data: { tweet },
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => console.log(err.message));

        if(res?.data) {
            setStatus(false);
            setFormActive(false);
            setTweet('');
        } else {
            setStatus(true);
        }
    }

    return (
        <div className=''>
            {formActive && <p className='bg-gray-200 p-3'>
                <textarea 
                    type='textarea'
                    name='newTweet'
                    placeholder={!error ? 'Write a new tweet' : error}
                    className={error ? 'text-red-800 placeholder-red-600 font-bold border-red-700 border-3 p-2 mb-2 rounded' : 'border-blue-200 border-2 p-2 mb-2 rounded font-bold'}
                    style={{width: '15em'}}
                    cols={3}
                    rows={4}
                    maxLength={160}
                    value={tweet}
                    onChange={handleChange}
                    required={true}
                /><br />
                <span 
                    className='cursor-pointer bg-gray-500 p-2 m-2 text-white rounded hover:bg-gray-400' onClick={handleFormActive}
                > 
                    Cancel 
                </span>
                <span 
                    className={tweet ? 'cursor-pointer bg-green-600 p-2 mb-2 text-white rounded hover:bg-green-400 hover:text-black' : 'bg-gray-600 p-2 mb-2 text-white rounded'} onClick={sendTweet}
                > 
                    Send Tweet 
                </span>
            </p>}
            {status && <div style={{backgroundColor: 'white', fontWeight: 'bold'}} className='text-red-500 text-bold p-2 rounded'>Please check your network !</div>}

                    <p className='my-2 py-2 pl-6 bg-blue-400 text-white font-bold'>Tweets 
                    {!formActive && <span className='bg-purple-600 p-3 ml-6 -mr-8 rounded cursor-pointer hover:bg-green-400 hover:text-black' onClick={handleFormActive}>Send Tweet</span>}
                    </p>
            {tweets.map((tweet, idx) => (
                <Tweet key={idx} tweet={tweet} baseUrl={baseUrl} sync={sync} setSync={setSync} apiCallHook={apiCallHook} />
            ))}
        </div>
    )
}

const Tweet = ({tweet: {id, name, body, email}, baseUrl, apiCallHook}) => {
    const [editForm, setEditForm] = useState(false);
    const [tweetText, setTweetText] = useState(body);
    
    const handleTweetChange = (e) => {
        setTweetText(e.target.value);
    }

    const editTweet = () => {
        setEditForm(!editForm);
    }
   
    const updateTweet = () => {
        apiCallHook('PUT', `${baseUrl}/comments/${id}`, {body: tweetText});
        setTimeout(() => {
            setEditForm(false);
        }, 300);
    }

    const deleteTweet = () => {
        apiCallHook('DELETE', `${baseUrl}/comments/${id}`);
    }
    return(
    <div 
        style={{fontFamily: 'Roboto', backgroundColor: 'white'}} 
        className='border-blue-200 border-2 flex flex-col text-md p-2 font-bold m-1 hover:bg-white-500'
    >
        <span style={{fontFamily: 'Architects Daughter'}} className='font-bold text-md text-center mb-2'>{name}</span>
        <p className=' text-left flex flex-col'>
            {!editForm && <span>{body}</span>}
            {editForm && <span>
                <textarea 
                    className='border-red-700 border-3 p-2 mb-2 rounded'
                    style={{width: '100%'}}
                    cols={3}
                    rows={4}
                    maxLength={160}
                    value={tweetText}
                    onChange={handleTweetChange}
                    required={true}
                /><br />
                 <span 
                    className='cursor-pointer bg-gray-500 p-2 m-2 text-white rounded hover:bg-gray-400' onClick={() => editTweet()}
                > 
                    Cancel 
                </span>
                <span 
                    className='cursor-pointer bg-green-600 p-2 mb-2 text-white rounded hover:bg-green-400 hover:text-black' onClick={() => updateTweet()}
                > 
                    Update Tweet 
                </span>
                </span>}
            <span className='flex mt-3'><FaUserAlt /><span className='ml-2'>{email}</span> </span>
        </p>

        {!editForm && 
            <p className='my-2 flex justify-center'>
            <span className='cursor-pointer mr-3' onClick={() => editTweet()}> 
                <FaEdit size={23} />
            </span>
            <span className='cursor-pointer' onClick={() => deleteTweet()}> 
                <AiFillDelete size={23} color='red'/>
            </span>
            </p>}
    </div>
    )
}
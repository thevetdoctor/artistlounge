/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Albums from './Albums';
import Tweets from './Tweets';
import { FaInternetExplorer, FaUserAlt, FaUserSecret } from 'react-icons/fa';
import { HiSpeakerphone } from 'react-icons/hi';
import data from './sampleData.json';

export default function Artists({baseUrl}) {
    const [status, setStatus] = useState(false);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [single, setSingle] = useState(false);
    const [artistBio, setArtistBio] = useState({name: 'ola'});
    const [artistAlbum, setArtistAlbum] = useState([]);
    const [artistTweet, setArtistTweet] = useState([]);
    const [sync, setSync] = useState(false);

    const handleSingle = (artist, albums, tweets) => {
        setArtistBio(artist);
        setArtistAlbum(albums);
        setArtistTweet(tweets);
        setSingle(!single);
    }

    const apiCallHook = async(method, url, data) => {
        const res = await axios({
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
            }
            })
            .catch(error => {
                if(error.isAxiosError) {
                    console.log(error.message);
                }
            });
            setSync(!sync);
    }

    const getAlbums = async() => {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/albums`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => console.log(err.message));

        if(res?.data) {
            setAlbums(res.data)
        }
    }

    const getTweets = async() => {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/comments`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => console.log(err.message));

        if(res?.data) {
            setTweets(res.data);
        }
    }

    const getArtists = async() => {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/users`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => console.log(err.message));

        if(res?.data) {
            setStatus(false);
            setArtists(res.data);
        } else {
            setArtists(data);
            setStatus(true);
        }
    }

    useEffect(() => {
        getArtists();
        getAlbums();
        
        return () => {}
    }, []);
    
    useEffect(async() => {
        getTweets();
        
        return () => {}
    }, [sync]);

    return (
        <div className=''>
            {status && <div style={{backgroundColor: 'white', fontWeight: 'bold'}} className='text-red-500 text-bold py-2 mx-1 rounded'>Please check your network !</div>}
            {!single &&
            <>{artists.map((artist, idx) => {
                const artistAlbums = albums.filter(album => album.userId === artist.id)
                const artistTweets = tweets.filter(tweet => tweet.postId === artist.id)
                return <Artist key={idx} artist={artist} albums={artistAlbums} tweets={artistTweets} baseUrl={baseUrl} single={single} handleSingle={handleSingle} sync={sync} setSync={setSync} apiCallHook={apiCallHook} />
            })}
            </>}
            {single &&
            <Artist artist={artistBio} albums={artistAlbum} tweets={artistTweet} baseUrl={baseUrl} single={single} handleSingle={handleSingle} sync={sync} setSync={setSync} apiCallHook={apiCallHook} />
            }   
        </div>
    )
}


const Artist = ({artist: {name, username, website, company}, albums, tweets, baseUrl, single, handleSingle, sync, setSync, apiCallHook }) => {
    const [albumView, setAlbumView] = useState(false);

    const handleAlbumView = () => {
        setAlbumView(!albumView);
    }

    return (
    <div style={{backgroundColor: 'white'}} className='bg-blue-200 p-2 border-blue-200 border-2 rounded m-1 flex flex-col'>
        {!single &&
        <p className=' text-left flex flex-col'>
            <span className='flex'><FaUserSecret /><span className='ml-2'>{name}</span> </span>
            <span className='flex'> <FaUserAlt /> <span className='ml-2'>{username}</span></span>
            <span className='flex'> <FaInternetExplorer /> <span className='ml-2'>{website}</span></span>
            <span className='flex'> <HiSpeakerphone /> <span className='ml-2'>{company?.catchPhrase}</span></span>
            <span className='flex'> Albums: <span className='ml-2'>{albums.length}</span></span>
        </p>}
        <p className='mt-3 mb-2'>
            <span className='bg-blue-600 p-2 text-white mr-2 rounded cursor-pointer hover:bg-blue-400 hover:text-black' onClick={() => handleSingle(name, albums, tweets)}>{single ? 'Go Back' : 'View More'}</span>
            {single && <span className='bg-green-600 p-2 text-white rounded cursor-pointer hover:bg-green-400 hover:text-black' onClick={handleAlbumView}> View {!albumView ? 'Albums' :'Tweets'}</span>}
        </p>
        {single && albumView && <Albums albums={albums} baseUrl={baseUrl} />}
        {single && !albumView && <Tweets tweets={tweets} baseUrl={baseUrl} sync={sync} setSync={setSync} apiCallHook={apiCallHook}/>}
    </div>
    )
}
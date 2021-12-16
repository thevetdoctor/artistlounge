/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AlbumData({albumId, baseUrl}) {
    const [albumData, setAlbumsData] = useState([]);

    const getAlbumData = async() => {
        const res = await axios({
            method: 'GET',
            url: `${baseUrl}/albums/${albumId}/photos`,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .catch(err => console.log(err));

        console.log(res);
        if(res?.data) {
            setAlbumsData(res.data)
            console.log('albums photos data fetched');
        }
    }

    useEffect(() => {
        getAlbumData();

        return () => {}
    }, []);

    return (
        <div>
            {albumData.slice(0, 3).map((album, idx) => (
                <p className='flex' id={idx}>
                    <img 
                        src={album.thumbnailUrl}
                        alt={album.title}
                        className='rounded w-6 h-6 m-1'
                        />
                    {album.title}
                </p>
            ))}
            3 out of {albumData.length} album photos: See more ?
        </div>
    )
}

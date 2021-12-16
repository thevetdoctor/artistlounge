/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import AlbumData from './AlbumData';

export default function Albums({albums, baseUrl}) {

    return (
        <div className=''>
            <p className='my-2 p-2 bg-blue-400 text-white font-bold'>Albums</p>
            {albums.map((album, idx) => (
                <Album key={idx} album={album} baseUrl={baseUrl} />
            ))}
        </div>
    )
}

const Album = ({album: {id, title }, baseUrl}) => (
    <div style={{fontFamily: 'Roboto', backgroundColor: 'white'}} className='border-blue-200 border-2 text-left p-5 flex flex-col text-md border-1 font-bold m-1 hover:bg-white-500'>
        {/* <span>ID: {id}</span> */}
        <span>Album: {title}</span>
        <AlbumData albumId={id} baseUrl={baseUrl} /> 
    </div>
)
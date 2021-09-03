import React, {useState} from 'react';
import ReactPlayer from 'react-player'




const AudioPlayer = ({url, playing}) => {

    return (
        <div className='player-wrapper'>
            <ReactPlayer
                url={url}
                playing={playing}
                width="100px"
                height="100px"
            />
        </div>
    );
};

export default AudioPlayer;


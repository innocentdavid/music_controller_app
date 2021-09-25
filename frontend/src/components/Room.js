import React, { useState } from 'react';

function Room(props) {
    const [guestCanPause, useGuestCanPause] = useState(true);
    const [votesToSkip, useVotesToSkip] = useState(0);
    const [isHost, useIsHost] = useState(false);

    const [errMsg, useErrMsg] = useState('');

    const { roomCode } = props.match.params;
    getRoomDetails();

    function getRoomDetails () {
        fetch (`/api/get-room?code=${roomCode}`)
        .then(res => res.json())
        .then(data => {
            if(!data.msg) {
                useVotesToSkip(data.votes_to_skip);
                useGuestCanPause(data.guest_can_pause);
                useIsHost(data.is_host);
            }
            else{
                useErrMsg(data.msg);
                console.log(errMsg);
            }
        });
    }

    return (
        <div>
            {errMsg ||
                <div>
                    <h3>{roomCode}</h3>
                    <p>Votes: {votesToSkip.toString()}</p>
                    <p>Guest Can Pause: {guestCanPause.toString()}</p>
                    <p>Host: {isHost.toString()}</p>
                </div>
            }
        </div>
    )
}

export default Room

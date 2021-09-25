import React, { useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@material-ui/core';

function RoomJoinPage(props) {

    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState(false);

    const handleEnterRomm = () => {
        fetch('/api/join-room', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.message == 'Room Joined!') {
                props.history.push(`/room/${roomCode}`);
            }
            else {
                setError('Room not found');
            }
        })
        .catch(error => {
            // console.log(error);
        })
    }
    
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField
                    align="left"
                    className="roomCode"
                    placeholder="Enter a Room Code"
                    label="Code"
                    value={roomCode}
                    error={error}
                    helperText={error}
                    variant="outlined"
                    onChange={(e) => {setRoomCode(e.target.value)}}
                />
            </Grid>

            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={handleEnterRomm}>
                    Enter Room
                </Button>
            </Grid>
            
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    back
                </Button>
            </Grid>
        </Grid>
    )
}

export default RoomJoinPage

import React, { useState } from 'react';
import { Button, FormControl, FormControlLabel, FormHelperText, Grid, Radio, RadioGroup, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

function CreateRoomPage(props) {
    var defaultVotes = 2;

    const [guestCanPause, useGuestCanPause] = useState(true);
    const [votesToSkip, useVotesToSkip] = useState(defaultVotes);

    const handleVotesChange = (e) => {
        useVotesToSkip(e.target.value);
    }

    const handleGuestCanPauseChange = (e) => {
        useGuestCanPause(e.target.value === 'true' ? true : false);
    }
    
    function handleSubmitButton() {
        fetch("/api/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                guest_can_pause: guestCanPause,
                votes_to_skip: votesToSkip
            }),
        })
        .then(res => res.json())
        .then(data => {
            props.history.push(`/room/${data.code}`)
        })
    }

    return (
        
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <FormControl component="fieldset">

                    <FormHelperText>
                    <span align='center'>Guest Control of Playback State</span>
                    </FormHelperText>

                    <RadioGroup row defaultValue='true' onChange={handleGuestCanPauseChange}>
                        <FormControlLabel
                            value="true"
                            control={<Radio color="primary" />}
                            label="Play/Pause"
                            labelPlacement="bottom"
                        />

                        <FormControlLabel
                            value="false"
                            control={<Radio color="secondary" />}
                            label="No Control"
                            labelPlacement="bottom"
                        />
                    </RadioGroup>

                </FormControl>
            </Grid>

            <Grid item xs={12} align='center'>
                <FormControl>

                    <TextField
                        required={true}
                        type="number"
                        onChange={handleVotesChange}
                        defaultValue={votesToSkip}
                        inputProps={{ 
                            min: 1,
                            style: {textAlign: 'center'},
                        }}
                    />
                    
                    <FormHelperText>
                    <span align="center">Votes Required To Skip Song</span>
                    </FormHelperText>

                </FormControl>
            </Grid>

            <Grid item xs={12} align='center'>
                <Button onClick={handleSubmitButton} color="primary" variant="contained">Create A Room</Button>
            </Grid>
            
            <Grid item xs={12} align='center'>
                <Button color="secondary" variant="contained" to='/' component={Link}>Back</Button>
            </Grid>
        </Grid>
    )
}

export default CreateRoomPage

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room';
import RoomJoinPage from './RoomJoinPage';

function HomePage() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    Hello
                </Route>
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
                <Route path='/room/:roomCode' component={Room} />
            </Switch>
        </Router>
    )
}

export default HomePage
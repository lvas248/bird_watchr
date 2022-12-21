import { Card, CardBody } from 'reactstrap'
import { Switch, Route, NavLink } from 'react-router-dom'

import Profile from './Profile'
import Post from './Post'

function MyStuff(){

    return (
        <Card id='myStuffContainer'>
            <CardBody className='leftPanel'>
                    <NavLink className='navItem' to='/my-stuff'>Profile</NavLink>
                    <NavLink className='navItem' to='/my-stuff/posts'>My Posts</NavLink>
                    <NavLink className='navItem' to='/my-stuff/likes'>My Likes</NavLink>
            </CardBody>
            <div id='rightPanel'>
                <Switch>
                    <Route exact path='/my-stuff'>
                        <Profile />
                    </Route>

                    <Route path='/my-stuff/posts'>
                        <Post />
                    </Route>

                    <Route path='/my-stuff/likes'>
                        <Post />
                    </Route>

                </Switch>
            </div>
        </Card>
    )
}

export default MyStuff
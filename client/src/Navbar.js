import { Nav, NavItem, Button } from 'reactstrap'
import { NavLink, useHistory } from 'react-router-dom'
import { UserContext } from './App'
import { useContext } from 'react'


function Navbar(){

    const [ user, setUser ] = useContext(UserContext)
    const history = useHistory()

    function logout(){
        fetch('/logout',{
            method: 'DELETE'
        })
        setUser({})
        history.push('/login')
    }

    return(
        <div id='nav_container'>
            <div id='title'>
                <h1>Bird Watcher</h1>    
            </div>

            <Nav
                fill
                pills
                >
                <NavItem>

                    <NavLink 
                        exact to="/" className='navBtn'> 
                        <strong>My Posts</strong>
                    </NavLink>

                </NavItem>


                <NavItem>

                    <NavLink 
                        to="/new-post"  className='navBtn'>
                        <strong>New Post</strong>
                    </NavLink>

                </NavItem>

{/* 
                <NavItem>

                    <NavLink 
                        to="/my-stuff/posts"  className='navBtn'>
                       <strong>My Stuff</strong>
                    </NavLink>

                </NavItem> */}


                <NavItem>
                    { user.id ? (<Button onClick={()=>logout()}>Logout</Button>
                    ) : <NavLink className='navBtn' to="/login"><strong>Login</strong></NavLink>}
                </NavItem>
            
            </Nav>            
        </div>

    )
}

export default Navbar
import { Nav, NavItem, Button } from 'reactstrap'
import { NavLink } from 'react-router-dom'



function Navbar({user, removeUser}){

    function logout(){
        fetch('/logout',{
            method: 'DELETE'
        })
        removeUser()
    }

    return(
        <div id='nav_container'>
            <div id='title'>
                <h1>Bird Watchr</h1>    
            </div>

            <Nav
                fill
                pills
                >
                <NavItem>

                    <NavLink 
                        to="/feed" className='navBtn'> 
                        <strong>Feed</strong>
                    </NavLink>

                </NavItem>


                <NavItem>

                    <NavLink 
                        to="/new-post"  className='navBtn'>
                        <strong>Post Bird</strong>
                    </NavLink>

                </NavItem>


                <NavItem>

                    <NavLink 
                        to="mystuff"  className='navBtn'>
                       <strong>My Stuff</strong>
                    </NavLink>

                </NavItem>


                <NavItem>
                    { user.id ? (<Button onClick={()=>logout()}>Logout</Button>
                    ) : <NavLink className='navBtn' to="/login"><strong>Login</strong></NavLink>}
                </NavItem>
            
            </Nav>            
        </div>

    )
}

export default Navbar
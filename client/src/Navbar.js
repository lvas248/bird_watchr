import { Nav, NavItem, NavLink, Button } from 'reactstrap'



function Navbar({user, removeUser}){

    function logout(){
        fetch('/logout',{
            method: 'DELETE'
        })
        // .then(res => res.json())
        // .then( data => console.log(data))
        removeUser()
    }

    return(
        <div id='nav_container'>
            <div>
                <h1>Bird Watchr</h1>    
            </div>

            <Nav
                fill
                pills
                >
                <NavItem>
                    <NavLink active href="/">
                        Feed
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/post" >
                        Post Bird
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        My Stuff
                    </NavLink>
                </NavItem>
                <NavItem>
                    { user.id ? <Button onClick={logout}>Logout</Button> : <NavLink href="/login">Login</NavLink>}
                </NavItem>
            
            </Nav>            
        </div>

    )
}

export default Navbar
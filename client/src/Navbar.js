import { Nav, NavItem, NavLink } from 'reactstrap'

function Navbar({user}){
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
                    <NavLink href="/login">
                        Login
                    </NavLink>
                </NavItem>
            
            </Nav>            
        </div>

    )
}

export default Navbar
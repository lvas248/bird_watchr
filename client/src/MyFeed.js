import { Button } from 'reactstrap'
import { useState } from 'react'
import { UserContext } from './App'
import { useContext } from 'react'
import Post from './Post'


function MyFeed({birds}){

    const [ user, setUser ] = useContext(UserContext)
    const [ sideBarSelection, setSideBarSelection ] = useState(null)

    function clearSideBarSelection(){
        setSideBarSelection(null)
    }

    function deleteUserBird(id){
        //create delete fetch request that deletes any of the user's posts that are associated with a specific bird
        fetch(`/bird-posts/${id}`,{
            method: 'DELETE'
        })
        .then( res => {
            if(res.ok){
                //create userCopy, remove bird from userCopy.birds
                let userCopy = { ...user, birds: user.birds.filter( b => b.id !== id)}
                //remove all posts that contain the deleted bird id
                userCopy = {...userCopy, formatted_posts: userCopy.formatted_posts.filter( p => p.bird_info.id !== id)}
                //set user state to userCopy
                setUser(userCopy)
            }
        })
     
    }

    const renderUserBirdBtns = user?.birds.map( b => {
        return  <div className='btnCtn' key={b.id}>
                    <Button className='fltrBtn' onClick={()=>setSideBarSelection(b)}>{b.name}</Button>
                    <Button onClick={()=>deleteUserBird(b.id)}>x</Button>
                </div>
    })
   
    const renderPosts = user?.formatted_posts.map( p => {
        return <Post 
                key={p.id} 
                post={p} 
                birds={birds} 
                clearSideBarSelection={clearSideBarSelection}/>
    })

 
    return (
        <div id='myFeed'>

            { user?.birds.length > 0 ? (
                <>
                    <div id='sideBar'>
                        <h3>My Birds</h3>
                        <Button key={0} onClick={clearSideBarSelection}>All</Button>
                        {renderUserBirdBtns}
                    </div>

                    <div id='myPosts'>
                        { sideBarSelection ? (
                            <div id='infoBox'>
                                <h2>{sideBarSelection.name}</h2>
                                <p>{sideBarSelection.description}</p>
                            </div>
                        ) : null}
                        {renderPosts}
                    </div>
                </>


            ): <h3 id='create'>Create a New Post</h3>
            
            }

        </div>
    )
}

export default MyFeed
import { Button } from 'reactstrap'
import { useState } from 'react'
import { UserContext } from './App'
import { useContext } from 'react'
import Post from './Post'


function MyFeed({birds, createUniqueUserBirdsFromCurrentPosts}){

    const [ user, setUser ] = useContext(UserContext)
    const [ sideBarSelection, setSideBarSelection ] = useState({})

    function clearSideBarSelection(){
        setSideBarSelection({})
    }

    function deleteUserBird(id){
        //create delete fetch request that deletes any of the user's posts that are associated with a specific bird
        fetch(`/bird-posts/${id}`,{
            method: 'DELETE'
        })
        // In global user obj, delete all posts with specific bird, delete the bird from user.birds
        let userCopy = {...user, birds: user.birds.filter( b => b.id !== id)}
        userCopy = {...userCopy, posts: userCopy.posts.filter( p => p.bird_info.id !== id) }
        setUser(userCopy)
        setSideBarSelection({})
    }

    const renderUserBirdBtns = user.birds?.map( b => {
        return  <div className='btnCtn' key={b.id}>
                    <Button className='fltrBtn' onClick={()=>setSideBarSelection(b)}>{b.name}</Button>
                    <Button onClick={()=>deleteUserBird(b.id)}>x</Button>
                </div>
    })

    const filteredPosts = user.posts?.filter( p => p.bird_info.name.includes(sideBarSelection.name || '') )

    const sortedPosts = filteredPosts?.sort((a,b) => b.id - a.id )
   
    const renderPosts = sortedPosts?.map( p => {
        return <Post 
                key={p.id} post={p} 
                birds={birds} 
                createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts} 
                clearSideBarSelection={clearSideBarSelection}/>
    })

 
    return (
        <div id='myFeed'>
            <div id='sideBar'>
                <h3>My Birds</h3>
                <Button key={0} onClick={clearSideBarSelection}>All</Button>
                {renderUserBirdBtns}
            </div>
            <div id='myPosts'>
                { sideBarSelection.id ? (
                    <div id='infoBox'>
                        <h2>{sideBarSelection.name}</h2>
                        <p>{sideBarSelection.description}</p>
                    </div>
                ) : null}
                {renderPosts}
            </div>
        </div>
    )
}

export default MyFeed
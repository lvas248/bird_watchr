import { Button } from 'reactstrap'
import { useState } from 'react'
import Post from './Post'
function MyFeed({user, birds, createUniqueUserBirdsFromCurrentPosts}){

    const [ sideBarSelection, setSideBarSelection ] = useState({})

    function clearSideBarSelection(){
        setSideBarSelection({})
    }

    const renderUserBirdBtns = user.birds?.map( b => {
        return <Button key={b.id} onClick={()=>setSideBarSelection(b)}>{b.name}</Button>
    })

    const filteredPosts = user.posts?.filter( p => p.bird_info.name.includes(sideBarSelection.name || '') )

    const renderPosts = filteredPosts?.map( p => {
        return <Post key={p.id} post={p} birds={birds} user={user} createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts} clearSideBarSelection={clearSideBarSelection}/>
    })

 
    return (
        <div id='myFeed'>
            <div id='sideBar'>
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
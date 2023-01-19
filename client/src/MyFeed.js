import { Button } from 'reactstrap'
import Post from './Post'
function MyFeed({user, birds, createUniqueUserBirdsFromCurrentPosts}){



    const renderUserBirdBtns = user.birds?.map( b => {
        return <Button key={b.id}>{b.name}</Button>
    })

    const renderPosts = user.posts?.map( p => {
        return <Post key={p.id} post={p} birds={birds} user={user} createUniqueUserBirdsFromCurrentPosts={createUniqueUserBirdsFromCurrentPosts}/>
    })
 


    return (
        <div id='myFeed'>
            <div id='sideBar'>{renderUserBirdBtns}</div>
            <div id='myPosts'>
                {renderPosts}
            </div>
        </div>
    )
}

export default MyFeed
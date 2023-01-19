import { Button } from 'reactstrap'
import Post from './Post'
function MyFeed({user}){



    const renderBirdBtns = user.birds?.map( b => {
        return <Button key={b.id}>{b.name}</Button>
    })

    const renderPosts = user.posts?.map( p => {
        return <Post key={p.id} post={p} />
    })
 


    return (
        <div id='myFeed'>
            <div id='sideBar'>{renderBirdBtns}</div>
            <div id='myPosts'>
                {renderPosts}
            </div>
        </div>
    )
}

export default MyFeed
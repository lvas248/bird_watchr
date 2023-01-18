import { Button } from 'reactstrap'

function MyFeed({user}){



    const renderBirdBtns = user.birds?.map( b => {
        return <Button key={b.id}>{b.name}</Button>
    })

 


    return (
        <div id='myFeed'>
            <div id='sideBar'>{renderBirdBtns}</div>
            <div id='myPosts'>My Posts</div>
        </div>
    )
}

export default MyFeed
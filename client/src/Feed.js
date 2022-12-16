import Post from './Post';

function Feed({posts, user}){

    const renderCards = posts.map( post =>{
        return <Post key={post.id} post={post} user={user}/>
        })
        
    return (
        <div id='feed'>
            {renderCards}
        </div>
    )
}
export default Feed
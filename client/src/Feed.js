import Post from './Post';

function Feed({posts, user, birds, updateBird}){

    const renderCards = posts.map( post =>{
        return <Post key={post.id} post={post} user={user} birds={birds} updateBird={updateBird}/>
        })
        
    return (
        <div id='feed'>
            {renderCards}
        </div>
    )
}
export default Feed
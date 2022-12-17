import Post from './Post';

function Feed({posts, user, birds, updatePost, deletePost}){

    const renderCards = posts.map( post =>{
        return <Post key={post.id} post={post} user={user} birds={birds} updatePost={updatePost} deletePost={deletePost}/>
        })
        
    return (
        <div id='feed'>
            {renderCards}
        </div>
    )
}
export default Feed
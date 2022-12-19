import Post from './Post';

function Feed({posts, user, birds, updatePost, deletePost, addLikeToPosts, removeLikeFromPosts}){

    const renderCards = posts.map( post =>{
        return <Post key={post.id} post={post} user={user} birds={birds} updatePost={updatePost} deletePost={deletePost} addLikeToPosts={addLikeToPosts} removeLikeFromPosts={removeLikeFromPosts}/>
        })
        
    return (
        <div id='feed'>
            {renderCards}
        </div>
    )
}
export default Feed
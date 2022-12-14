import Post from './Post';

function Feed({posts}){

    const renderCards = posts.map( post =>{
        return <Post key={post.id} post={post}/>
        })
        
    return (
        <div id='feed'>
            {renderCards}
        </div>
    )
}
export default Feed
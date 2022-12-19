import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import { CardBody } from 'reactstrap'
function CommentSection({post, user, addCommentToPost, deleteCommentFromPosts}){

    const renderComments = post.comments.map( comment => {
        return <CommentCard 
                    key={comment.id} 
                    comment={comment} 
                    user={user} 
                    deleteCommentFromPosts={deleteCommentFromPosts}
                />
    })

    return (
        <CardBody>
            <CommentForm 
                post={post} 
                user={user} 
                addCommentToPost={addCommentToPost}
                
                />
            <div>
                {renderComments}
            </div>
        </CardBody>
    
    )
}
export default CommentSection
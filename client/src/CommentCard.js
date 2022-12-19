import { Card, CardTitle, CardText, Button } from 'reactstrap'

function CommentCard({comment, user, deleteCommentFromPosts}){

    function deleteComment(){
        fetch(`/comments/${comment.id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => deleteCommentFromPosts(data))
    }

    return(
        <Card className='commentCard'>
                <CardTitle tag='h6'>👤{comment.user.username}</CardTitle>
                <CardText>⋯{comment.content}</CardText>
                {comment.user.id === user.id ? (
                    <div>
                        <Button size='sm' onClick={deleteComment}>❌</Button>
                    </div>
                ):null}
        </Card>
    )
}

export default CommentCard
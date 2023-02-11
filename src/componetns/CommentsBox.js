import React, { useState } from "react";
import './CommentSec.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DeleteIcon from '@mui/icons-material/Delete';

const Comment = ({ id, username, text, likes, dislikes, onLike, onDislike, deleteComment }) => (

    <div className='eachComment' >
        <p className="user">{username}</p>
        <h3 className="text">{text}</h3>

        <div className='post-btn'>
            <span>{likes}</span> <ThumbUpIcon onClick={() => onLike(id)} className='like'> </ThumbUpIcon>
            {dislikes}<ThumbDownIcon onClick={() => onDislike(id)} className='dislike'>  </ThumbDownIcon>
            <DeleteIcon onClick={() => deleteComment(id)} className='delete'>  </DeleteIcon>

        </div>
    </div>
)

const CommentsBox = () => {

    const [comments, setComments] = useState([]);


    const [newComment, setNewComment] = useState("");
    const [newUser, setNewUser] = useState("");

    const handleLike = id => {
        const updatedComments = comments.map(comment =>
            comment.id === id
                ? { ...comment, likes: comment.likes + 1 }
                : comment
        );
        setComments(updatedComments);
    };

    const handleDislike = id => {
        const updatedComments = comments.map(comment =>
            comment.id === id
                ? { ...comment, dislikes: comment.dislikes + 1 }
                : comment
        );
        setComments(updatedComments);
    };

    const handleDelete = id => {
        const updatedComments = comments.filter(comment => comment.id !== id)
        setComments(updatedComments)
    }

    const handleSubmit = event => {

        const id = comments.length + 1;
        const comment = { id, username: newUser, text: newComment, likes: 0, dislikes: 0 };

        setComments([...comments, comment]);
        setNewComment("");
        setNewUser("")
    };

    return (

        <div className='CommentSec'>
            <div className='container'>
                <div className="username">
                    Username: <input type='text' value={newUser} size='40' onChange={(e) => setNewUser(e.target.value)} />
                </div>
                <div className="comment">
                    Comment: <input type='text' value={newComment} size='40' onChange={(e) => setNewComment(e.target.value)} />
                </div>
                <button onClick={handleSubmit} id='add'>Add</button>

            </div>
            {comments.map(comment => (
                <Comment
                    key={comment.id}
                    id={comment.id}
                    username={comment.username}
                    text={comment.text}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                    onLike={handleLike}
                    onDislike={handleDislike}
                    deleteComment={handleDelete}
                />
            ))}

        </div>
    )
}

export default CommentsBox
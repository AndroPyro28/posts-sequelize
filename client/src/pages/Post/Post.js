import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './postDesign.css'
import Cookies from 'js-cookie';

function Post({ currentUser }) {
    const { id } = useParams();

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(async () => {
        const res = await axios.get(`/api/getPostById/${id}`, {
            withCredentials: true,
            headers: {
                userToken: Cookies.get("userToken")
            }
        });
        setPost(res.data);
    }, [refresh]);

    useEffect(async () => {
        const res = await axios.get(`/api/getCommentsByPostId/${id}`, {
            withCredentials: true,
            headers: {
                userToken: Cookies.get("userToken")
            }
        });
        setComments(res.data);
    }, [])

    const addComment = async () => {
        if (!newComment) return;
        const values = {
            commentBody: newComment,
            PostId: id
        }
        const res = await axios.post(`/api/createComment`, { values }, {
            withCredentials: true,
            headers: {
                userToken: Cookies.get("userToken")
            }
        });

        const { success, comment } = res.data;
        if (success) {
            setComments(prev => [...prev, comment])
            setNewComment("");
        }
    }

    const handleOnchange = (e) => {
        setNewComment(e.target.value);
    }

    const handleDeleteComment = async (id) => {
        const res = await axios.delete(`/api/deleteComment/${id}`, {
            withCredentials: true,
            headers: {
                userToken: Cookies.get("userToken")
            }
        })
        const { success } = res.data;

        if (success) {
            setComments(prev => prev.filter(comment => comment.id !== id))
        }
    }

    const editPost = async (type) => {
        try {
            let newContent = "";
            if (type === "title") {
                newContent = window.prompt("Enter new title");
            }
            else {
                newContent = window.prompt("Enter new Post Text");
            }

            if (!newContent) return;

            const res = await axios.put("/api/editPost", {
                id,
                type,
                newContent
            }, {
                withCredentials: true,
                headers: {
                    userToken: Cookies.get("userToken")
                }
            })

            const { msg } = res.data;

            alert(msg);
            return (type === "title") ?
             setPost({ ...post, title: newContent }) 
            : 
            setPost({ ...post, postText: newContent })

        } catch (error) {
            console.error(error);
        }


    }

    return (
        <div className="flex">
            <div className="left">
                <div className="post__container">
                    <div className="title" > {post.title} {currentUser?.id == post.UserId && <i className="fas fa-pencil-alt editIcon" onClick={() => editPost("title")}>...</i>}  </div>
                    <div className="postText"> {post.postText} {currentUser?.id == post.UserId && <i className="fas fa-pencil-alt editIcon" onClick={() => editPost("postText")}>...</i>}</div>
                    <div className="footer"> {post.username} </div>
                </div>
            </div>

            <div className="right">
                <div className="input__container">
                    <div className="add__comment">
                        <input placeholder="Add comment"
                            onChange={handleOnchange}
                            value={newComment}
                            onKeyPress={(e) => e.key === "Enter" && addComment()}
                        />

                        <button onClick={addComment} className="comment__btn" type="submit">Add Comment</button>
                    </div>
                </div>

                <div className="comments">
                    <h2 style={{ color: 'grey', textAlign: 'center' }}>Comments</h2>
                    {
                        comments.map(comment => (
                            <div style={{ textAlign: "center" }} key={comment.id}>
                                {comment.username} <i className="fas fa-backspace" onClick={() => handleDeleteComment(comment.id)}></i>
                                <div className="comment" key={comment.id}>{comment.commentBody}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Post

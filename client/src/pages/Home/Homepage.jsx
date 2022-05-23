import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./homeDesign.css";
import Cookies from "js-cookie";

function Homepage({ currentUser }) {
  console.log(currentUser);
  const [posts, setPosts] = useState([]);
  const [resfresh, setRefresh] = useState(false);
  useEffect(() => {
    axios
      .get("/api/getAllPosts", {
        withCredentials: true,
      })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [resfresh]);

  const handleLikePost = async (PostId) => {
    const res = await axios.post(
      "/api/likes",
      { PostId },
      {
        withCredentials: true,
        headers: {
          userToken: Cookies.get("userToken"),
        },
      }
    )
    setRefresh(!resfresh)
  };

  const deletePost = async (id) => {
    const res = await axios.delete(`/api/deletePost/${id}`, {
      withCredentials: true,
      headers: {
        userToken: Cookies.get("userToken"),
      }
    })

    setPosts(posts.filter(post => post.id !== id));
  }
  
  return (
    <React.Fragment>
      <div className="posts__container">
        <h1 className="home__header">Posts</h1>
        {posts.map((post, index) => (
          <div className="post__container">
            {
              currentUser.id == post.UserId && <i className="fas fa-eraser eraser" onClick={() => deletePost(post.id)}></i>
            }
            <Link key={post.id} to={`/post/${post.id}`}>
              <div className="title"> {post.title} </div>
              <div className="postText"> {post.postText} </div>
              <div className="footer"> {post.username} </div>
            </Link>
            <div className="interaction__container">

              <i className="fas fa-heart likeIcon"> {post.Likes.length > 0 ? post.Likes.length : 0}</i>
              {post.Likes.some((info) => info.UserId == currentUser.id) ? (
              <i className="fas fa-heart likeIcon"onClick={() => handleLikePost(post.id)}>&nbsp;Unlike this post</i>
            ) : (
              <i className="far fa-heart likeIcon"  onClick={() => handleLikePost(post.id)}>&nbsp;Like this post</i>
            )}

            </div>

          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default Homepage;

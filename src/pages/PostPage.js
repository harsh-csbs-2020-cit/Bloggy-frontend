import { formatISO9075 } from "date-fns";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://bloggy-backend-29h7.onrender.com/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo);
      });
    });
  }, []);

  if (!postInfo) return "";
  return (
    <div className="post-page">
      <div className="postt">
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by {postInfo.author.username}</div>
        {userInfo.id === postInfo.author._id && (
            <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit this post</Link>
            </div>
        )}
        <div className="image">
          <img src={`https://bloggy-backend-29h7.onrender.com/${postInfo.cover}`} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
      </div>
    </div>
  );
};

export default PostPage;

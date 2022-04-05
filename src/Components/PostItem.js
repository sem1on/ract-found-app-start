import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {

    const navigate = useNavigate();
    function handleClick() {
        navigate(`/posts/${props.post.id}`);
      }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.id} {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton
                    onClick={handleClick}
                >
                    Open
                </MyButton>
                <MyButton
                    onClick={() => props.onRemove(props.post)}
                >
                    Delete
                </MyButton>
            </div>
        </div>
    )
}

export default PostItem;
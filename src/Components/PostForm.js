import React from "react";
import { useState } from "react";

import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({onAdd}) => {
    
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        onAdd(newPost)
        setPost({title: '', body: ''});
    };

    return (
        <form>
            <MyInput 
                type="text" 
                placeholder='Название поста'
                value={post.title}
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput 
                value={post.body}
                onChange={e => setPost({...post, body: e.target.value})}
                type="text" 
                placeholder='Описание'
            />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    )

    
}

export default PostForm;
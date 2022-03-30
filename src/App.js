import { useState } from 'react';

import PostList from './Components/PostList';
import MyButton from './Components/UI/button/MyButton';
import MyInput from './Components/UI/input/MyInput';

import './Styles/App.css';

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])
    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault();
        setPosts([...posts, {...post, id: Date.now()}]);
        setPost({title: '', body: ''});
    };

    return (
        <div className="App">
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
            <PostList posts={posts} title={'Список постов'}/>
        </div>
    );
}

export default App;

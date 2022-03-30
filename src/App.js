import { useState } from 'react';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';


import './Styles/App.css';

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])

    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
    };

    return (
        <div className="App">
            <PostForm onAdd={onAdd}/>
            <PostList posts={posts} title={'Список постов'}/>
        </div>
    );
}

export default App;

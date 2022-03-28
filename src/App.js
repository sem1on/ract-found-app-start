import { useState } from 'react';

import PostList from './Components/PostList';

import './Styles/App.css';

function App() {

    const [posts, setPost] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])

    return (
        <div className="App">
            <PostList posts={posts} title={'Список постов 1'}/>
        </div>
    );
}

export default App;

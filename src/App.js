import { useState } from 'react';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import MySelect from './Components/UI/select/MySelect';


import './Styles/App.css';

function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])

    const [selectedSort, setSelectedSort] = useState('');

    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
    };

    const onRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPost = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className="App">
            <PostForm onAdd={onAdd}/>
            <hr style={{margin: '15px 0'}} />
            <div>
                <MySelect 
                    value={selectedSort}
                    onChange={sortPost}
                    defaultValue='Сортировка'
                    options={[
                        {value: 'title', name: 'По названию'},
                        {value: 'body', name: 'По описанию'}
                    ]}
                />
            </div>
            {posts.length
                ? <PostList  posts={posts}  title={'Список постов'} onRemove={onRemove}/>
                : <h1 style={{textAlign: 'center'}}> Посты не найдены</h1>
            }
        </div>
    );
}

export default App;

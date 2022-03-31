import { useMemo, useState } from 'react';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';

import './Styles/App.css';



function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});

    const sortedPosts = useMemo(() => {
        if(filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts]);

    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
    };

    const onRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    return (
        <div className="App">
            <PostForm onAdd={onAdd}/>
            <hr style={{margin: '15px 0'}} />
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            {sortedAndSearchedPosts.length
                ? <PostList  posts={sortedAndSearchedPosts}  title={'Список постов'} onRemove={onRemove}/>
                : <h1 style={{textAlign: 'center'}}> Посты не найдены</h1>
            }
        </div>
    );
}

export default App;

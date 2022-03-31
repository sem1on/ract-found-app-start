import { useState } from 'react';

import { usePosts } from './hooks/usePost';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';

import MyModal from './Components/UI/modal/MyModal';
import MyButton from './Components/UI/button/MyButton';

import './Styles/App.css';


function App() {

    const [posts, setPosts] = useState([
        {id: 1, title: 'JS', body: 'Description'},
        {id: 2, title: 'PT', body: 'Description'},
        {id: 3, title: 'C#', body: 'Description'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    
    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const onRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать новый пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm onAdd={onAdd}/>
            </MyModal>
            
            <hr style={{margin: '15px 0'}} />
            <PostFilter 
                filter={filter} 
                setFilter={setFilter}
            />
            <PostList posts={sortedAndSearchedPosts} title={'Список постов'} onRemove={onRemove}/>
        </div>
    );
}

export default App;

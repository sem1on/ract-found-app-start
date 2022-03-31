import { useEffect, useState } from 'react';

import { usePosts } from './hooks/usePost';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';

import MyModal from './Components/UI/modal/MyModal';
import MyButton from './Components/UI/button/MyButton';

import './Styles/App.css';
import PostService from './API/PostService';


function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [isPostLoading, setIsPostLoading] = useState(false);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const onRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    async function fetchPosts() {
        setIsPostLoading(true);
        await PostService.getAll()
            .then(response => response.json())
            .then(data => setPosts(data))
        setIsPostLoading(false);
    }

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
            {isPostLoading 
                ? <h1>Идет загрузка....</h1>
                :<PostList posts={sortedAndSearchedPosts} title={'Список постов'} onRemove={onRemove}/>
            }
            
        </div>
    );
}

export default App;

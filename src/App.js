import { useEffect, useState } from 'react';

import { usePosts } from './hooks/usePost';
import { useFetching } from './hooks/useFetching';
import { getPages } from './utils/pages';

import PostList from './Components/PostList';
import PostForm from './Components/PostForm';
import PostFilter from './Components/PostFilter';
import PostService from './API/PostService';

import MyModal from './Components/UI/modal/MyModal';
import MyButton from './Components/UI/button/MyButton';
import Loader from './Components/UI/loader/Loader';

import './Styles/App.css';
import Pagination from './Components/UI/pagination/Pagination';


function App() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    

    const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPages(totalCount, limit))
    })
    

    useEffect(() => {
        fetchPosts()
    }, [page])
    
    const onAdd = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    };

    const onRemove = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    const changePage = (page) => {
        setPage(page)
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
            {postError &&
                <h1>Произошла оштбка {postError}</h1>    
            }
            {isPostLoading 
                ? <div style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div> 
                : <PostList posts={sortedAndSearchedPosts} title={'Список постов'} onRemove={onRemove}/>
            }
            <Pagination 
                totalPages={totalPages} 
                page={page} 
                changePage={changePage}
            />
        </div>
    );
}

export default App;

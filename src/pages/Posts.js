import { useEffect, useRef, useState } from 'react';

import { usePosts } from '../hooks/usePost';
import { useFetching } from '../hooks/useFetching';
import { useObserver } from '../hooks/useObserver';
import { getPages } from '../utils/pages';

import PostService from '../API/PostService';

import PostList from '../Components/PostList'
import PostForm from '../Components/PostForm';
import PostFilter from '../Components/PostFilter';
import MyModal from '../Components/UI/modal/MyModal';
import MyButton from '../Components/UI/button/MyButton';
import Loader from '../Components/UI/loader/Loader';
import Pagination from '../Components/UI/pagination/Pagination';
import MySelect from '../Components/UI/select/MySelect';


function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const lastElement = useRef();

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostLoading, postError] = useFetching( async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPages(totalCount, limit))
    })
    
    useObserver(lastElement, page < totalPages, isPostLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts()
    }, [page, limit])
    
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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='Кол-во элементов на странице'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Покасать все'},
                ]}
            />
            {postError &&
                <h1>Произошла оштбка {postError}</h1>    
            }
            <PostList posts={sortedAndSearchedPosts} title={'Список постов'} onRemove={onRemove}/>
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
            {isPostLoading &&
                 <div style={{display: 'flex', justifyContent:'center', marginTop: '50px'}}><Loader/></div>
            }
            <Pagination 
                totalPages={totalPages} 
                page={page} 
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;

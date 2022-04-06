import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../API/PostService';
import Loader from '../Components/UI/loader/Loader';
import { useFetching } from '../hooks/useFetching';

const PostIdPage = () => {
    const [post, setPost] = useState({});
    const [comment, setComment] = useState([]);

    const params = useParams();

    const [fetchByid, isLoading, error] = useFetching( async(id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    const [fetchComment, isCommLoading, commError] = useFetching( async(id) => {
        const response = await PostService.getComment(id);
        setComment(response.data);
    });

    useEffect(() => {
        fetchByid(params.id)
        fetchComment(params.id)
    }, []);

    return (
        <div className='post__wrapper'>
            <h3>Post</h3>
            {isLoading
                ? <Loader/>
                : <div style={{fontSize: '20px'}}>{post.id}. {post.title}</div>
            }
            <h3 style={{marginTop: '35px'}}>Comments</h3>
            {isCommLoading
                ? <Loader/>
                : <div style={{marginTop: '20px'}}>
                    {comment.map(comm =>
                        <div key={comm.id} style={{marginTop: '20px'}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>)}
                </div>
            }
        </div>
    );
};

export default PostIdPage;
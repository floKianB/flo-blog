import React, {useState} from 'react';
import { Grid, Card, Container } from '@mui/material';
import CardComponent from './Card';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Blogs = () => {
    const notify = () => {
        toast.error('No posts available', {
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
        });
    }

    // Get posts from our REDUX STORE
    const recivedPosts = useSelector(state => state.postsInfo.posts);
    const fillteredPosts = useSelector(state => state.postsInfo.fillteredPosts);

    // initial store for all posts
    const [activePosts, setActivePosts] = useState(recivedPosts);
    // Load all posts from GraphQL API when we recived them from REDUX THUNK store.posts
    useEffect(() => {
        setActivePosts(recivedPosts);
    }, [recivedPosts])
    // Load filltered posts after any changes applied to our REDUX THUNK store.fillteredPosts
    useEffect(()=> {
        setActivePosts(fillteredPosts);
    }, [fillteredPosts])
    

    return (
    <>
        <Card item xs={12} md={9} mt={4} sx={{ backgroundColor: 'rgb(24,118,209,0.9)', mb: 3 }}>
            <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', margin: '15px 0', textAlign: 'center' }}>
                Blogs
            </p>
        </Card>
        <Grid container spacing={3} >
            
            {
            (activePosts.length !== 0) ?
                (
                    activePosts.map((post, index) => {
                        if(JSON.parse(localStorage.getItem('savedPostsID')) !== null){
                            if(JSON.parse(localStorage.getItem('savedPostsID')).includes(post.postSlug)){
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                                        <CardComponent key={index} {...post} saveStatus={true} />
                                    </Grid>
                                )
                            } else {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                                        <CardComponent key={index} {...post} saveStatus={false} />
                                    </Grid>
                                )                            
                            }
                        }
                        return (
                            <Grid item xs={12} sm={6} md={4} key={post.id}>
                                <CardComponent key={index}  {...post} saveStatus={false} />
                            </Grid>
                        );
                    })) : (notify(),
                    <Container item xs={12} sm={6} md={4} width="100%" align="center" >
                        <ToastContainer style={{ position: 'relative'}}/>
                    </Container>
                )
            } 
        </Grid>
    </>
    )
    }

export default Blogs;
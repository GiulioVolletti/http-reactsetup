import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        post: [],
        selectedPostId: null,
    }
    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response =>{
                const posts = response.data.slice(0,4);
                const updatedPost = posts.map(post =>{
                    return {
                        ...post,
                        author: 'carl'
                    }
                })
                this.setState({post:updatedPost})
                //console.log(response.data)
            });
    }
    postSelectedHandler = (id) =>{
        this.setState({selectedPostId: id })
    }
    render () {
        const post = this.state.post.map(post=>{
            return <Post clicked={()=> this.postSelectedHandler(post.id)} key={post.id} title={post.title} author={post.author} />
        });
        return (
            <div>
                <section className="Posts">
                   {post}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
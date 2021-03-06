import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state={
        loaderPost: null,
    }
    componentDidUpdate(){
        if (this.props.id) {
            if((!this.state.loaderPost || this.state.loaderPost) && this.state.loaderPost.id !== this.props.id) {
                axios.get('/posts/' + this.props.id)
                .then(response => {
                   // console.log(response.data)
                    this.setState({loaderPost: response.data})
                })
                .catch(error => {console.log(error);})

            }
            
        }
        
    }
    //delete post
    deletePostHandler = () => {
        
        axios.delete('/posts', this.props.id)
            .then(response =>
                {
                    console.log(response)
                }).catch(error => {console.log(error);});

    }
    render () {
        let post = <p style={{textAlign: 'center'}} > Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}} > Loading...</p>;
        }
        if (this.state.loaderPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loaderPost.title}</h1>
                    <p>{this.state.loaderPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );
            
        }
        
        return post;
    }
}

export default FullPost;
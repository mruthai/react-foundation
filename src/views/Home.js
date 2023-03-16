import { useState, useEffect, useContext} from "react";
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'
import { AuthContext } from '../contexts/AuthProvider'
import PostForm from "../components/PostForm";


export default function Home(){
  const { posts } = useContext(DataContext)
  const { user } = useContext(AuthContext)
    return (
        <div className="App">
            <h1>Home</h1>
            {
                (user.loggedIn) ?    /* turnary to only allow user to access post after logged in ? */
                <PostForm/> :
                <></>
            }
            { posts.map((post) => <Post post={post} key={post.id}/>) }
        </div>
    )
}
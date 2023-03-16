
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'



export default function PostSingle() {
    const { id, uid } = useParams()
    const [post, setPost] = useState({})
    const [postError, setPostError] = useState(false)
    const { getPost } = useContext(DataContext)
 
    
    useEffect(() => {
        async function handleLoad() {
            try {
                const data = await getPost(uid,id)
                setPost(data)
            } catch(error) {
                setPostError(true)
            }
        }
        handleLoad()
    }, [])

    return (
        <div className="App">
            { postError ?
            <>
                <h2> 404 </h2>
                <p>Post with id {id} could not be found</p>
                </> :
                <>

                <h1>Post Single: {id}</h1>
                <Post post={post} hidelink={true} />
                </>

            }
        </div>
        
    )
}
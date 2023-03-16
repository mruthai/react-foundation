import { useState, useEffect, createContext, useContext } from "react";
import { getFirestore, getDocs, collection, getDoc, doc, addDoc, Timestamp, collectionGroup, query } from '@firebase/firestore'
import { AuthContext } from './AuthProvider'

export const DataContext = createContext()
    
export const DataProvider = function(props) {
    const[posts, setPosts] = useState([])
    const{ user } = useContext(AuthContext)
    const db = getFirestore();
    console.log(posts)
    useEffect(() => {
        async function getPosts() {
            const postQuery = query(collectionGroup(db, 'posts'))
            const querySnapshot = await getDocs(postQuery)
            const loadedPosts = []
            querySnapshot.forEach((doc) => {
                loadedPosts.push({
                    id: doc.id,
                    uid: doc.ref.parent.parent.id,
                    ...doc.data()
                })
                // console.log(doc.id, doc.data())
            })
            setPosts(loadedPosts)
            // const response = await fetch('https://cdn109-fakebook.onrender.com/api/posts')
            // const data = await response.json()
            // setPosts(data)
        }
        getPosts()
    }, [])

    async function getPost(uid,id) {
        // get a refenece to our document
        const docRef = doc(db,'user', uid, 'post', id)
        // get a snapshot of information 
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()){
            //Throw an error, so that the catch is triggedered in PostSingle
            throw new Error
        }

       return docSnap.data()
    }
        // const response = await fetch(`https://cdn109-fakebook.onrender.com/api/post/${id}`)
        // const data = await response.json()
        // return data
        // console.log(id)

    // adding post to database  pass in title and body
    async function addPost(title, body) {
        const newPost = {
            title,   // shorthand for title: title key and value have same name
            body,
            dateCreated: Timestamp.now(),
            username: user.displayName
        }
        const docRef = await addDoc(collection(db,'users', user.id, 'posts'), newPost)
        newPost.id = docRef.id
        setPosts([
            ...posts,   // order of display switch ...posts, to bottom for newpost to show first
            newPost
        ])

        return newPost
    }
        
        
    async function getPokemonData (pokemonId) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await response.json()
        return data
    }


    const value = {
        posts,
        getPokemonData,
        getPost,
        addPost
        
        
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}
import React, { useEffect, useState } from 'react'
import PostCard from '../post/PostCard'
import Alert from '../customalert/Alert'
import { useUser } from '../../context/userContext';

const Home = () => {
    const [alertMessage,setAlertMessage] = useState('');
    // const [post,setPost]=useState([])
    const {currentUser,posts,setPost} = useUser()
    useEffect(()=>{
        const localData = JSON.parse(localStorage.getItem("posts"))
        if (localData) {
            setPost(localData)
        }
    },[])
    const onClose =()=>{
       setAlertMessage('')
    }
    const deletePost = (postId)=>{
        if (!currentUser.name) {
            setAlertMessage("Please login first");
            return;
          }
          // console.log(id, currentUser.email, currentUser.email);
          const newUpdatePost = posts.filter((post) => {
            return post.id !== postId;
          });
          setPost(newUpdatePost);
          localStorage.setItem("posts", JSON.stringify(newUpdatePost));
          setAlertMessage("Post deleted successfully");
    }
    const updatePost = (postId,data)=>{
        if (!data) {
            alert("Invalid post title")
            return null
        }
        const currentPost = posts.filter(post=>post.id ===postId)
        if (!currentPost) {
            alert("Post not found")
            return null
        }
        const updated = posts.map((post)=>{
            if (post.id===postId) {
                return {...post,post:{post:data.newPost}}
            }
            return post
        })
        const newArray = [...updated]
        setPost(newArray)
        localStorage.setItem("posts",JSON.stringify(updated))
        console.log(updated);
    }
  return (
    <div className=' pt-[10vh]'>
        {alertMessage &&<Alert message={alertMessage} onClose={onClose}  />}
       <div className='container w-[80%] m-auto flex flex-col justify-center items-center'>
        <div className=' p-4'>
            <h1 className=' text-3xl font-semibold'>All Feeds are Here</h1>
        </div>
         {posts.length>0? <div className=' grid md:grid-cols-2 lg:grid-cols-4 gap-5'>
             {posts?.map((p)=>{
                return <PostCard key={p.id} cardInfo={p} currentUser={currentUser} deletePost={deletePost} updatePost={updatePost}/>
             })}
          </div>:<div><h1>Oops there is no post yet...</h1></div>}
       </div>
    </div>
  )
}

export default Home

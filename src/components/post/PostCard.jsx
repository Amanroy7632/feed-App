import  { useState } from 'react'
import Button from '../auth/commonUI/Button'
import Input from '../auth/commonUI/Input'
import { useUser } from '../../context/userContext'
import { useForm } from 'react-hook-form'

const PostCard = ({cardInfo,deletePost,id,updatePost}) => {
    const {currentUser,posts,setPost} = useUser()
    const [editEnabled,setEditEnabled] =useState(false)
    const [editPostId,setEditPostId] = useState(null)
    const {register,handleSubmit,reset}=useForm()
    const updateHandler = (postId)=>{
       setEditEnabled(!editEnabled)
       setEditPostId(postId)
    }
    const updatePostHandler=(data)=>{
        updatePost(editPostId,data)
        setEditEnabled(false)
        setEditPostId(null)
        reset()
    }
  return (
    <div className=' flex w-full flex-col border p-3 shadow-md'>
       <div className=' flex justify-center items-center flex-col'>
        {!editEnabled&& <h1>{cardInfo.post.post}</h1> }
        {
            editEnabled && cardInfo.id ===editPostId &&<div className=''>
                <form onSubmit={handleSubmit(updatePostHandler)} className=' flex'>
                    <Input type="text" {...register("newPost",{
                        required:true
                    })}/>
                    <Button className=' bg-white' type='submit'>✔️</Button>
                </form>
            </div>
        }
       </div>
       <div className='p-2'>
        <p>Date: {cardInfo.date}</p>
        <p>Created: {cardInfo.owner===currentUser.email?"Own":cardInfo.ownerName}</p>
       </div>
       <div>
        {cardInfo.owner===currentUser.email && <div className=' flex flex-col justify-center gap-2 p-2'>
            <Button className={` bg-red-500`} onClick={()=>{deletePost(cardInfo.id)}}>Delete</Button>
            <Button className={`bg-green-700`} onClick={()=>updateHandler(cardInfo.id)}>Update</Button></div>}
       </div>
    </div>
  )
}

export default PostCard

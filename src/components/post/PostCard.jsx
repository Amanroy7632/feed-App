import React from 'react'
import Button from '../auth/commonUI/Button'

const PostCard = ({cardInfo,currentUser,deletePost,id}) => {
  return (
    <div className=' flex w-full flex-col border p-3 shadow-md'>
       <div className=' flex justify-center items-center flex-col'>
        <h1>{cardInfo.post.post}</h1> 
       </div>
       <div className='p-2'>
        <p>Date: {cardInfo.date}</p>
        <p>Created: {cardInfo.owner===currentUser.email?"Own":cardInfo.ownerName}</p>
       </div>
       <div>
        {cardInfo.owner===currentUser.email && <div className=' flex flex-col justify-center gap-2 p-2'>
            <Button className={` bg-red-500`} onClick={()=>{deletePost(cardInfo.id)}}>Delete</Button>
            <Button className={`bg-green-700`}>Update</Button></div>}
       </div>
    </div>
  )
}

export default PostCard

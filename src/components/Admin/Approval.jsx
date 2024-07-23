import React, { useEffect, useState } from "react";
import { useUser } from "../../context/userContext";
import Button from "../auth/commonUI/Button";
import Alert from "../customalert/Alert";
const Approval = () => {
  const {
    alertMessage,
    setAlertMessage,
    onClose,
    posts,
    setPost,
    currentUser,
  } = useUser();
  const [postId, setPostId] = useState(null);
  const [unApprovedPosts, setunApprovedPosts] = useState([]);
  const [currentUserPost,setCurrentUserPost] = useState([])
  useEffect(() => {
    setunApprovedPosts(posts.filter((post) => !post.isApproved));
    setCurrentUserPost(posts.filter((post)=>post.owner===currentUserPost.email && !post.isApproved))
  }, [postId]);
  const approvalHandle = (postId) => {
    console.log(postId);
    console.log(currentUser.email);
    if (!currentUser.email) {
      alert("Unauthorized access , Login First");
      return null;
    }
    const updatedPost = posts.map((post) => {
      if (post.id === postId && !post.isApproved) {
        return { ...post, isApproved: true, approvedBy: currentUser.email };
      }
      return post;
    });
    const newPosts = [...updatedPost];
    setPost(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    console.log(newPosts);
    setPostId(postId);
    setAlertMessage("Post has been approved successfully.");
  };
  const deletePost = (postId) => {
    if (!currentUser.email) {
      alert("Unauthorized access , Login First");
      return null;
    }
    const updatedPost = posts.filter((post) => post.id !== postId);
    const newPosts = [...updatedPost];
    setPost(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    console.log(newPosts);
    setPostId(postId);
    setAlertMessage("Post has been removed successfully.");
  };

  return (
    <div className="p-6 border">
      <h1 className=" text-2xl font-semibold pl-1 pb-1">Pending Approvals</h1>
      <div className=" h-[50vh] overflow-y-scroll border ">
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {unApprovedPosts.length > 0 && currentUserPost.length!==unApprovedPosts.length
            ? unApprovedPosts.map((post, index) => {
                if (post.owner === currentUser.email) {
                  return null;
                }
                return (
                  <div
                    key={post?.id}
                    className=" flex w-full  flex-col border p-3 shadow-md"
                  >
                    <div className=" flex justify-center items-center flex-col">
                      <h1>{post?.post?.post}</h1>
                    </div>
                    <div className="p-2">
                      <p>Date: {post?.date}</p>
                      <p>
                        Created:{" "}
                        {post.owner === currentUser.email
                          ? "Own"
                          : post.ownerName}
                      </p>
                    </div>
                    <div>
                      <div className=" flex flex-col justify-center gap-2 p-2">
                        <Button
                          className={` bg-red-500`}
                          onClick={() => deletePost(post.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          className={`bg-green-700`}
                          onClick={() => approvalHandle(post.id)}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            : <div>Nothing Left to approval...</div>}
        </div>
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={onClose} />}
    </div>
  );
};

export default Approval;

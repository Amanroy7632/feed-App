import { useForm } from "react-hook-form";
import Input from "../auth/commonUI/Input";
import {  useRef, useState } from "react";
import Button from "../auth/commonUI/Button";
import Home from "./Home";
import PostCard from "../post/PostCard";
import { useUser } from "../../context/userContext";
import Alert from "../customalert/Alert";
const LandingPage = () => {
  //   const [posts, setPost] = useState([]);
  const [currentUserPost, setCurrentUserPost] = useState([]);
  const [currentUserPostVisible, setCurrentUserPostVisible] = useState(false);
  const { handleSubmit, register, reset } = useForm();
  const [cpyVisible, setcpyVisible] = useState(false);
  const {
    alertMessage,
    setAlertMessage,
    onClose,
    currentUser,
    posts,
    setPost,
  } = useUser();
  const ref = useRef("");
  function generateCurrentDate() {
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear()
    return `${day}/${month}/${year}`;
  }
  const generateId = (length) => {
    let code = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const integers = "0123456789";
    if (length < 5) {
      length = 6;
    }
    for (let index = 0; index < length; index++) {
      code +=
        characters.charAt(Math.floor(Math.random() * characters.length)) +
        integers.charAt(Math.floor(Math.random() * integers.length));
    }
    return code;
  };
  const createPost = (data) => {
    if (!data.post) {
      
      setAlertMessage("Please write something...");
      return;
    }
    if (!currentUser.name) {
      setAlertMessage("please login first ...");
    //   alert("Please login first..");
      return;
    }
    const postInfo = {
      post: data,
      id: generateId(6),
      owner: currentUser.email,
      ownerName: currentUser.name,
      date: generateCurrentDate(),
      isApproved:false
    };
    const localStorageData = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPost = [postInfo,...localStorageData];
    setPost(updatedPost);
    localStorage.setItem("posts", JSON.stringify(updatedPost));
    console.log(JSON.parse(localStorage.getItem("posts")));
    setAlertMessage("Post created successfully");
    reset();
    setCurrentUserPost(
        updatedPost.filter((post) => post.owner === currentUser.email)
      );

  };
  const deletePost = (id) => {
    if (!currentUser.name) {
      setAlertMessage("Please login first");
      return;
    }
    // console.log(id, currentUser.email, currentUser.email);
    const newUpdatePost = posts.filter((post) => {
      return post.id !== id;
    });
    setPost(newUpdatePost);
    localStorage.setItem("posts", JSON.stringify(newUpdatePost));
    setAlertMessage("Post deleted successfully");
  };
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
  const viewMyPost = (e) => {
    e.preventDefault();
    setCurrentUserPost(
      posts.filter((post) => post.owner === currentUser.email)
    );
    setCurrentUserPostVisible(!currentUserPostVisible);
    console.log("Displaying all posts");
  };
  const viewOtherPostsHandler = (e) => {
    e.preventDefault();
    setCurrentUserPost(
      posts.filter((post) => post.owner !== currentUser.email)
    );
    setCurrentUserPostVisible(!currentUserPostVisible);
  };
//   useEffect(() => {
//     const localStoragePosts = JSON.parse(localStorage.getItem("posts"));
//     if (localStoragePosts) {
//       setPost(localStoragePosts);
//     }
//   }, [posts.length]);
  const handleCopyClick = async (data) => {
    setcpyVisible(true);
    console.log(data);
    await navigator.clipboard.writeText(data.post);
    setTimeout(() => {
      setcpyVisible(false);
    }, 2000);
  };
  return (
    <div className=" pt-[10vh]">
      <div className=" lg:w-[80%] flex justify-center flex-col m-auto">
        <div className=" flex justify-center flex-col lg:w-[80%] max-sm:w-[92%] m-auto">
          <h1 className=" text-3xl text-center">Feeds</h1>
          <div className="  shadow-md relative mt-5 ">
            <form>
              <Input
                label={""}
                type={"text"}
                placeholder="Enter something..."
                className={""}
                ref={ref}
                {...register("post", {
                  required: true,
                })}
              />

              {cpyVisible && (
                <div
                  onClick={handleCopyClick}
                  className=" absolute top-[-24px] right-0 rounded-r-md font-semibold text-orange-600 animate-bounce"
                >
                  Copied
                </div>
              )}
              <div
                onClick={handleSubmit(handleCopyClick)}
                className=" absolute top-0 right-0 border p-2 border-r-0 rounded-r-md bg-blue-500 font-semibold cursor-pointer duration-150 hover:bg-blue-800 text-white"
              >
                Copy
              </div>
              <div className=" flex justify-evenly max-sm:flex-col items-center p-4 gap-2">
                <Button
                  onClick={handleSubmit(createPost)}
                  className=" bg-green-500 w-full"
                >
                  Create Post
                </Button>
                <Button onClick={viewMyPost} className=" bg-yellow-600 w-full">
                  View My Post
                </Button>
                <Button
                  onClick={viewOtherPostsHandler}
                  className=" bg-pink-900 w-full"
                >
                  View Other User Post
                </Button>
              </div>
            </form>
          </div>
        </div>
        {
          //  currentUserPost&& <Home currentUser={currentUser} />
          currentUserPostVisible && currentUser.email && (
            <div className=" w-[80%] m-auto">
              <div className="flex justify-center pt-6">
                {currentUserPost.length === 0 ? (
                  <p className=" text-xl text-red-500">
                    You don't have posted yet ..
                  </p>
                ) : (
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
                    {currentUserPost.map((p, i) => {
                        // if (p.owner!==currentUser.email) {
                        //     return null
                        // }
                      return (
                        <PostCard
                          key={i}
                          cardInfo={p}
                          currentUser={currentUser}
                          deletePost={deletePost}
                          updatePost={updatePost}
                          id={i}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )
        }
        {currentUserPostVisible && !currentUser.email && (
          <div className=" flex justify-center p-6">
            <p className=" text-xl text-red-500">
              → For operating on post, Login First
            </p>
          </div>
        )}
      </div>
      {alertMessage && <Alert message={alertMessage} onClose={onClose} />}
    </div>
  );
};

export default LandingPage;

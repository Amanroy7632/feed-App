import { useForm } from "react-hook-form";
import Input from "../auth/commonUI/Input";
import {  useRef,useEffect, useState } from "react";
import Button from "../auth/commonUI/Button";
import PostCard from "../post/PostCard";
import { useUser } from "../../context/userContext";
import Alert from "../customalert/Alert";
import {generateCurrentDate,generateId} from "../../utility"
const LandingPage = () => {
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
    deletePost,
    updatePost
  } = useUser();
  const ref = useRef("");
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
  const viewMyPost = (e) => {
    e.preventDefault();
    setCurrentUserPost(
      posts.filter((post) => post.owner === currentUser.email)
    );
    setCurrentUserPostVisible(!currentUserPostVisible);
    // console.log("Displaying all posts");
  };
  const viewOtherPostsHandler = (e) => {
    e.preventDefault();
    setCurrentUserPost(
      posts.filter((post) => post.owner !== currentUser.email)
    );
    setCurrentUserPostVisible(!currentUserPostVisible);
  };
  const handleCopyClick = async (data) => {
    setcpyVisible(true);
    // console.log(data);
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

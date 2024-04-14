
import "./DetailHome.css";
import { useSelector } from "react-redux";
import { detailData, updateDetail } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../common/PostCard/PostCard";
import { CButton } from "../../common/CButton/CButton";
import { userData } from "../../app/slices/userSlice";
import { likeCall } from "../../services/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";

export const PostDetailHome = () => {

  const detailRdx = useSelector(detailData);

  const dispatch = useDispatch()

  const reduxUser = useSelector(userData)

  const navigate = useNavigate();

  const [isLikedBefore, setIsLikedBefore] = useState(detailRdx.detail?.likes.includes(reduxUser.tokenData.userID))

  const [post, setPost] = useState({
    postId: detailRdx.detail?._id,
    title: detailRdx.detail?.title,
    description: detailRdx.detail?.description
  })

  useEffect(() => {

    if (!detailRdx?.detail?._id) {
      navigate("/");
    }
  }, [detailRdx]);

  useEffect(() => {

    if (!reduxUser.tokenData?.token) {
      navigate("/");
    }
  }, [reduxUser]);

  const likePost = async (postId) => {

    try {
      const fetched = await likeCall(reduxUser.tokenData.token, postId)
      console.log(fetched)

     dispatch(updateDetail({ detail: fetched.data }))

     if(isLikedBefore===false){
      setIsLikedBefore(true)
      }else setIsLikedBefore(false)

      if (fetched.message === "Like") {
        toast.success(fetched.message)
      } else toast.info(fetched.message)

      if (fetched.data && fetched.data._id) {
        setPost(post?.map(post => post._id === postId ? fetched.data
          : detailRdx.detail))
      }

    } catch (error) {
      console.log(error)
    }
  }


  return (<div className="detailDesign">
    <div className="undoButton">
      <CButton
        className={"backButton"}
        title={"X"}
        emitFunction={(() => navigate('/'))}
      />
    </div>
    {detailRdx.detail?._id &&
      <PostCard
        authorFirstName={detailRdx.detail?.authorFirstName}
        authorLastName={detailRdx.detail?.authorLastName}
        title={detailRdx.detail?.title}
        description={detailRdx.detail?.description}
      />
    }
    <div className="likeContainer" key={detailRdx.detail?._id}>
      <CButton
        className={"likeButton"}
        title={<Heart fill={isLikedBefore===true ? "red"
        : "white"} />}
        emitFunction={() => likePost(detailRdx.detail?._id)}
      />
      <div className="likesNum">{detailRdx.detail?.likes.length}</div>
    </div>
    <ToastContainer
      position="top-center"
      autoClose={300}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </div>)
}
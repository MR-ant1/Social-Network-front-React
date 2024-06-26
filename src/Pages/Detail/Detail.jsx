
import "./Detail.css";

import { useSelector } from "react-redux";
import { detailData, updateDetail } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { userData } from "../../app/slices/userSlice";
import { validate } from "../../utils/validations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatePostCall, likeCall } from "../../services/apiCalls";
import { Heart } from "lucide-react";
import { useDispatch } from "react-redux";

export const PostDetail = () => {
  const detailRdx = useSelector(detailData);

  const reduxUser = useSelector(userData)
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [isLikedBefore, setIsLikedBefore] = useState(detailRdx.detail?.likes.includes(reduxUser.tokenData.userId))

  const [post, setPost] = useState({
    postId: detailRdx.detail?._id,
    title: detailRdx.detail?.title,
    description: detailRdx.detail?.description
  })

  const [postError, setPostError] = useState({
    titleError: "",
    descriptionError: ""
  })

  const [write, setWrite] = useState("disabled")

  useEffect(() => {
    if (!reduxUser.tokenData.token) {
        navigate("/")
    }
}, [reduxUser])

  useEffect(() => {
    toast.dismiss()
    postError.titleError && 
    toast.warn(postError.titleError)
    postError.descriptionError && 
    toast.warn(postError.descriptionError)
    }, [postError])



  const inputHandler = (e) => {
      setPost((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value
      }))
  }

  const checkError = (e) => {
      const error = validate(e.target.name, e.target.value)

      setPostError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error
      }))
  }


  useEffect(() => {

    if (!detailRdx?.detail?._id) {
      navigate("/");
    }
  }, [detailRdx]);

  const UpdatePost = async (postId) => {
    try {
        for (let elemento in post) {
            if (post[elemento] === "") {
                throw new Error("All fields are required")
            }
        }

        const fetched = await UpdatePostCall(reduxUser?.tokenData?.token, post, postId)
        
        if (fetched.message === "Post updated successfully"){
          toast.success(fetched.message)
          }else toast.error(fetched.message)
              
        
        setWrite("disabled")

        

    } catch (error) {
        console.log(error.message)
    }
}

const likePost = async (postId) => {

  try {
      const fetched = await likeCall(reduxUser.tokenData.token, postId)

      if(isLikedBefore===false){
        setIsLikedBefore(true)
      }else setIsLikedBefore(false)

      dispatch(updateDetail({detail: fetched.data}))

      if (fetched.message === "Like") {
          toast.success(fetched.message)

      } else toast.info(fetched.message)

      if (fetched.data && fetched.data._id) {
          setPost(post?.map(post => post._id === postId ? fetched.data
           : detailRdx.detail))}

  } catch (error) {
      console.log(error)
  }
}

  return (
    detailRdx.detail?._id &&
      <div className="detailDesign">
    <div className="undoButton">
      <CButton
        className={"backButton"}
        title={"X"}
        emitFunction={(() => navigate('/profile'))}
      />
    </div>
      <div className="postFields">
        <CInput
          className={`titleInputDesign ${postError.titleError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"title"}
          disabled={write}
          value={post.title || ""}
          changeFunction={inputHandler}
          blurFunction={checkError}
        />

        <CInput
          className={`descriptionInputDesign ${postError.descriptionError !== "" ? "inputDesignError" : ""
            }`}
          type={"text"}
          name={"description"}
          disabled={write}
          value={post.description || ""}
          changeFunction={inputHandler}
          blurFunction={checkError}
        />

        <CButton
          className={write === "" ? " updateButton" : "allowButton"}
          title={write === "" ? "Actualizar" : <img src="img/EditIcon.png" alt="editIcon"></img>}
          emitFunction={write === "" ? () => UpdatePost(post._id) : () => setWrite("")}
        />
        <div className="likeRow">
        <CButton
      className={"likeButton"}
      title={<Heart fill={isLikedBefore===true ? "red"
        : "white"}/>}
      emitFunction={() => likePost(detailRdx.detail?._id)}
      />
      <div className="likesNum">{detailRdx.detail?.likes.length}</div>
      </div>
      </div>
    
    <ToastContainer 
        position="top-center"
        autoClose={2000}
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
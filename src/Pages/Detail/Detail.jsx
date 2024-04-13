
import "./Detail.css";

import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { userData } from "../../app/slices/userSlice";
import { validate } from "../../utils/validations";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdatePostCall } from "../../services/apiCalls";

export const PostDetail = () => {
  const detailRdx = useSelector(detailData);

  const reduxUser = useSelector(userData)
  
  const navigate = useNavigate();

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
          title={write === "" ? "Actualizar" : "Habilitar"}
          emitFunction={write === "" ? () => UpdatePost(post._id) : () => setWrite("")}
        />
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
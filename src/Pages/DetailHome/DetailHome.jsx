
import "./DetailHome.css";

import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../../common/PostCard/PostCard";
import { CButton } from "../../common/CButton/CButton";

export const PostDetailHome = () => {
  const detailRdx = useSelector(detailData);
  const navigate = useNavigate();


  useEffect(() => {
  
    if (!detailRdx?.detail?._id) {
      navigate("/");
    }
  }, [detailRdx]);


  return <div className="detailDesign">
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
  </div>
}
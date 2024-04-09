
import "./Detail.css";

import { useSelector } from "react-redux";
import { detailData } from "../../app/slices/postDetailSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PostDetail = () => {
  const detailRdx = useSelector(detailData);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!detailRdx?.post?._id) {
  //     navigate("/");
  //   }
  // }, [detailRdx]);

  return <div className="detailDesign">{detailRdx?.post?._id && detailRdx?.post.title}</div>;
};
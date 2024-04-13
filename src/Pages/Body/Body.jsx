
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { Register } from '../Register/Register';
import { Profile } from '../Profile/Profile'
import { PostDetail } from "../Detail/Detail";
import { SuperAdmin } from "../SuperAdmin/SuperAdmin";
import { PostDetailHome } from "../DetailHome/DetailHome";

export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={'/'} replace/>} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/detail" element={<PostDetail />} />
      <Route path="/superAdmin" element={<SuperAdmin />} />
      <Route path="/detailHome" element={<PostDetailHome />} />
    </Routes>
  );
};
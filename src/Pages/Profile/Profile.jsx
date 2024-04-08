
import './Profile.css';
import { userData } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';


export const Profile = () => {

    const navigate = useNavigate();

    const reduxUser = useSelector(userData)

    useEffect(() => {
        if(!reduxUser.tokenData.token){
            navigate("/")
        }
    }, [reduxUser])

    return (
        <div className="profileDesign">Profile</div>
    )
}
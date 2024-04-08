
import './Header.css'
import { Navigator } from '../Navigator/Navigator'
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";

export const Header = () => {

    const reduxUser = useSelector(userData);
   

    const dispatch = useDispatch();

    return (
        <div className="headerDesign">
            <Navigator
                path="/"
                title="Home"
            />
            {reduxUser?.tokenData?.token ? (
                <div className='navigatorDesign'>
                    <Navigator
                        path='/profile' title={reduxUser?.tokenData?.user?.authorFirstName} />
                    <div
                        className='logoutDesign'
                        onClick={() => dispatch(logout({ tokenData: "" }))}>
                        log out
                    </div>
                </div>
            ) : (
                <div className='navigatorDesign'>
                    <Navigator
                        path="/login"
                        title="Login"
                    />
                    <Navigator
                        path="/register"
                        title="Register"
                    />
                </div>
            )}
        </div>
    )
}
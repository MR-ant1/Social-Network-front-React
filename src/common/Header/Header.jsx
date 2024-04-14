
import './Header.css'
import { Navigator } from '../Navigator/Navigator'
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../app/slices/userSlice";
import { IconNavigator } from '../IconNavigator/IconNavigator';


export const Header = () => {

    const reduxUser = useSelector(userData);

    const dispatch = useDispatch();

    return (
        <div className="headerDesign">
            <div className='titleRow'>
            <div className='webTitle'>
                <IconNavigator
                path="/"
                title={<img src='img/iconPNG.png' alt="Logo" />}
                />
            </div>
            </div>
            
            {reduxUser.tokenData.token ? (
                reduxUser.tokenData.user.role === 'super_admin' ? (
                    <div className='navigatorDesign'>
                        <Navigator
                            path='/superAdmin' title='admin area' />
                        <Navigator
                            path='/profile' title={reduxUser.tokenData.user.authorFirstName} />
                        <div
                            className='logoutDesign'
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            log out
                        </div>
                    </div>
                ) : (

                    <div className='navigatorDesign'>
                        <Navigator
                            path='/profile' title={reduxUser.tokenData.user.authorFirstName} />
                        <div
                            className='logoutDesign'
                            onClick={() => dispatch(logout({ tokenData: "" }))}>
                            log out
                        </div>
                    </div>
                )
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
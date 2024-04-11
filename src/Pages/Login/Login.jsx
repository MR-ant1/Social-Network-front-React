
import './Login.css'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { decodeToken } from "react-jwt"
import { CInput } from '../../common/CInput/CInput'
import { CButton } from '../../common/CButton/CButton'
import { loginCall } from '../../services/apiCalls'
import { login, userData } from '../../app/slices/userSlice'
import { validate } from '../../utils/validations'
import { RedirectButton } from '../../common/RedirectButton/RedirectButton'
import { useSelector } from 'react-redux'


export const Login = () => {

    const navigate = useNavigate()

    const reduxUser = useSelector(userData)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reduxUser.tokenData.token) {
            navigate("/")
        }
    }, [reduxUser.tokenData.token])

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",
      });

    const [msgError, setMsgError] = useState("");

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);
    
        setUserError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
        }));
      };

    const loginUser = async () => {

        try {
        const fetched = await loginCall(user);
            
        if(fetched.token) {
            const decoded = decodeToken(fetched.token)

            const passInfo = {
                token: fetched.token,
                user: decoded
            };
            dispatch(login({tokenData: passInfo}));

            setTimeout(() => {
                navigate("/")
            }, 500)
        }
    } catch (error) {
        setMsgError(error.message);
    }
    }

    return (
        <div className="loginDesign">
            <CInput
            className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
        }`}
            type={"email"}
            name={"email"}
            placeholder={"email"}
            value={user.email || ""}
            changeFunction={inputHandler}
            blurFunction={checkError}
            />
            <div className="error">{userError.emailError}</div>
            <CInput
            className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
        }`}
            type={"password"}
            name={"password"}
            placeholder={"password"}
            value={user.password || ""}
            changeFunction={inputHandler}
            blurFunction={checkError}
            />
            <div className="error">{userError.passwordError}</div>
            <CButton
            className={"cbuttonDesign"}
            title={"Login"}
            emitFunction={(loginUser)}
            />
            <div className="error">{msgError}</div>
            <div className="redirectRegisterMsg">Si no dispones de una cuenta, haz click aqui abajo</div>
            <RedirectButton
                className={"RedirectButtonDesign"}
                title={"Register"}
                emitFunction={() => navigate("/register")}
                />
        </div>
    )
}
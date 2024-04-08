
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { decodeToken } from 'react-jwt'
import { CInput } from '../../common/CInput/CInput'
import { CButton } from '../../common/CButton/CButton'
import { loginCall } from '../../services/apiCalls'
import { login } from '../../app/slices/userSlice'


export const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const loginUser = async () => {
        const fetched = await loginCall(user);

        if(fetched.token) {
            const decoded = decodeToken(fetched.token)

            const passInfo = {
                token: fetched.token,
                user: decoded
            };
            dispatch(login({ tokenData: passInfo}))

            setTimeout(() => {
                navigate("/")
            }, 500)
        }
    }
    return (
        <div className="loginDesign">
            <CInput
            type={"email"}
            name={"email"}
            value={user.email || ""}
            emitFunction={inputHandler}
            />
            <CInput
            type={"password"}
            name={"password"}
            value={user.password || ""}
            emitFunction={inputHandler}
            />
            <CButton
            className={"cbuttonDesign"}
            title={"Login"}
            emitFunction={loginUser}
            />
        </div>
    )
}
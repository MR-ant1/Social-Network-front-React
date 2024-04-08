
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { decodeToken } from 'react-jwt'


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
        }
    }
    return (
        <div className="loginDesign">Login</div>
    )
}
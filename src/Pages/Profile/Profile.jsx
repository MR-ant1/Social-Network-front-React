
import './Profile.css';
import { userData } from '../../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { CInput } from '../../common/CInput/CInput';
import { validate } from '../../utils/validations';
import { CButton } from '../../common/CButton/CButton';
import { GetProfile } from '../../services/apiCalls';


export const Profile = () => {

    const navigate = useNavigate();

    const reduxUser = useSelector(userData)

    useEffect(() => {
        if(!reduxUser.tokenData.token){
            navigate("/")
        }
    }, [reduxUser])

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [userError, setUserError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        passwordError: ""

    })

    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const userProfile = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }
            
            const fetched = await GetProfile()

            setMsgError(fetched.message)
            
            if (fetched.success === true){
            setTimeout(() => {    //After ending registration, page redirects to home.
                navigate("/")
            }, 500)}else navigate("/register")

        } catch (error) {
            setMsgError(error.message)
        }
    }

    return (
        <div className="profileDesign">
            <div className='inputsContainer'>
            <CInput
                className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"firstName"}
                name={"firstName"}
                value={user.firstName || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
                />
            <div className="error">{userError.firstNameError}</div>
            <CInput
                className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"lastName"}
                name={"lastName"}
                value={user.lastName || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
                />
            <div className="error">{userError.lastNameError}</div>
            <CInput
                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
                />
            <div className="error">{userError.emailError}</div>
            <CInput
                className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                type={"password"}
                placeholder={"password"}
                name={"password"}
                value={user.password || ""}
                changeFunction={inputHandler}
                blurFunction={checkError}
                />
            <div className="error">{userError.passwordError}</div>
            <CButton
                className={"cbuttonDesign"}
                title={"Register"}
                emitFunction={userProfile}
                />
            <div className="error">{msgError}</div>
            </div>
        </div>
    )
}
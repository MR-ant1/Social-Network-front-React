
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { redirectButton } from '../../common/RedirectButton/RedirectButton';
import { CButton } from '../../common/CButton/CButton';
import { CInput } from "../../common/CInput/CInput"
import { useState } from 'react';

export const Register = () => {
    const navigate = useNavigate();

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
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error
        }))
    }

    const registration = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("Todos los campos deben estar rellenos")
                }
            }
            
            const fetched = await RegisterUser(user)

            setMsgError(fetched.message)
            
            if (fetched.success === true){
            setTimeout(() => {          //After ending registration, page redirects to home.
                navigate("/")
            }, 500)}else navigate("/register")

        } catch (error) {
            setMsgError(error.message)
        }
    }
    return (
        <div className="registerBackgroundDesign">
            <CInput
                className={`inputDesign ${userError.firstNameError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"firstName"}
                name={"firstName"}
                value={user.firstName || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.firstNameError}</div>
            <CInput
                className={`inputDesign ${userError.lastNameError !== "" ? "inputDesignError" : ""
                    }`}
                type={"text"}
                placeholder={"lastName"}
                name={"lastName"}
                value={user.lastName || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.lastNameError}</div>
            <CInput
                className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                    }`}
                type={"email"}
                placeholder={"email"}
                name={"email"}
                value={user.email || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.emailError}</div>
            <CInput
                className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                    }`}
                type={"password"}
                placeholder={"password"}
                name={"password"}
                value={user.password || ""}
                onChangeFunction={(e) => inputHandler(e)}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="error">{userError.passwordError}</div>
            <CButton
                className={"cButtonDesign"}
                title={"Register"}
                functionEmit={registration}
            />
            <div className="error">{msgError}</div>
            <div className="accountMsg">Si ya tienes cuenta, haz click aqui abajo</div>
      <redirectButton
        className={"redirectButtonDesign"}
        title={"Login"}
        onClick={() => navigate("/login")}
      />
        </div>
    )
}
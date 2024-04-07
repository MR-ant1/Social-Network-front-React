
import './Header.css'
import { Navigator } from './Navigator/Navigator'

export const Header = () => {
    return (
        <div className="headerDesign">
            <Navigator 
                path="/"
                title="Home"
            />
            <Navigator 
                path="/login"
                title="Login"
            />
            <Navigator 
                path="/register"
                title="Register"
            />
        </div>
    )
}
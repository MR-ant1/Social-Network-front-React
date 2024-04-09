
import "./PostInput.css"

// eslint-disable-next-line react/prop-types
export const PostInput = ({className, type, name, placeholder, disabled, value, onClick, changeFunction}) => {

    return (

        <input 
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onClick={onClick}
            onChange={(e)=>changeFunction(e)}
        />
    )
}
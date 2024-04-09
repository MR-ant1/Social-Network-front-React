
import "./CInput.css"

// eslint-disable-next-line react/prop-types
export const CInput = ({className, type, name, placeholder, disabled, value, changeFunction, blurFunction}) => {

    return (

        <input 
            className={className}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={(e)=>changeFunction(e)}
            onBlur={(e) => blurFunction(e)}
        />
    )
}

import "./WriteCard.css"

// eslint-disable-next-line react/prop-types
export const WriteCard = ({ className, type, name, value, changeFunction }) => {

    return(
        <input
        className={className}
        type={type}
        name={name}
        value={value}
        onChange={(e)=>changeFunction(e)}
        />
    )
}
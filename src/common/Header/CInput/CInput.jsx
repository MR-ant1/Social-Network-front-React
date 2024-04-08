
import "./CInput.css"

// eslint-disable-next-line react/prop-types
export const CInput = ({type, name, value, emitFunction}) => {

    return (

        <input 
            className="inputDesign"
            type={type}
            name={name}
            value={value}
            onChange={(e)=>emitFunction(e)}
        />
    )
}
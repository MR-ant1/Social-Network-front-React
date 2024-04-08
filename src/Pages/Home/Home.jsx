
import "./Home.css"
import { useSelector } from 'react-redux'

export const Home = () => {
    
    const navigate = useNavigate()
    const tokenData = JSON.parse(localStorage.getItem("passport"))
    // eslint-disable-next-line no-unused-vars
    const [tokenStorage, setTokenStorage] = useState(tokenData?.token)

    //const services is an empty array to allow map introduce a card for each value returned by the backend in getServices function
    const [services, setServices] = useState([])

    useEffect(() => {
        if (services.length === 0) {                    //If there is no services, GetServices run.
            const servicesShowcase = async () => {
                try {
                    const fetched = await GetServices()

                    setServices(fetched.data)   //data obtained from backend is saved into services array.

                } catch (error) {
                    console.log(error)
                }
            }
            servicesShowcase()
        }
    }, [services])

    return (
        <>
            {services.length > 0 ? (
                <div className="backgroundImage">
                    {services.slice(0, services.length).map(      //Giving a limit to ensure that only brings the 5 existing services
                        service => {
                            return (
                                <div key={service.id}>
                                    <Card                                       //Using card component designed before with its props in common folder.
                                        id={"Nª servicio: " + service.id}
                                        title={service.serviceName}
                                        description={service.description}
                                        clickFunction={() => !tokenData?.token  //Depending if user owns a token or not, function sends to login or createAppointment
                                            ? navigate("/login")
                                            : navigate("/createAppointment")
                                        }
                                    />
                                </div>
                            )
                        })}
                </div>
            ) : (                   //While data is being loaded from db, this message shows on the screen
                <div>LOADING</div>
            )}

        </>
    )
}
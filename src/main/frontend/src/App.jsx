import { useEffectEvent } from "react"

function App() {

  const[planes,setPlanes]= userState([])
  const[error,setError]=userState(null)
  const[loading,setLoading] = useState(true)

  useEffect(()=>{
    fetch("htttp://localhost:8080/api/planes")
    .then(response=>{
      if (!response.ok)throw new Error("error al obtener planes")
      return response.json()
    })
    .then(data=>{
      setPlanes(data)
      setLoading(false)
    })
    .catch(err=>{
      setError(err.message)
      setLoading(false)
    })
  },[])
  
  return (
   <div>
    <h1>SPA Relax</h1>
    {loading && <p>cargando planes...</p>}
    {error && <p>Error:{error}</p>}


    <ul>
    {planes.map(plan=>(
      <li key={plan.id}>
        <h3>{plan.nombre}</h3>
        <p>{plan.descripcion}</p>
        <strong>${plan.precio}</strong>
      </li>
    ))}
    </ul>
   </div>
  )
}

export default App

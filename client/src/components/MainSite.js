import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "./messages/Loading";
import Error from "./messages/Error";


const MainSite = () =>{
const [loading, setLoading] = useState();
const [error, setError] = useState();
const [ports, setPorts] = useState();
const [modes, setModes] = useState();
 
    useEffect(() => {
        setLoading(true);
        setError(false);
        axios
          .get(`${process.env.REACT_APP_API_URL}/main/getModes`)
          .then((response) => {
              setModes(response.data);
          })
          .catch((error) => {
              setError(true)
          })
          axios
          .get(`${process.env.REACT_APP_API_URL}/main/getPorts`)
          .then((response) => {
            setPorts(response.data);
          })
          .catch((error) => {
              setError(true)
          })
          .then(() => {

            setLoading(false);
          });
      },[]);
if(error){
return <Error/>
}else if(loading){
return <Loading />
}else if(ports && modes){
    return(
    <>
    <div>{modes}</div>
    <div>{ports}</div>
    </>);

}else{
return <Loading />
}
}
export default MainSite;
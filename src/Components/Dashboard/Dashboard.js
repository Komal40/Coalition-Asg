
import { useLoaderData, useLocation, useParams } from 'react-router';
import './dashboard.css'
import { useContext } from 'react';
import { DataProvider } from '../../DataContext';


function Dashboard() {

   const {userData}=useContext(DataProvider)

   const data=JSON.parse(sessionStorage.getItem('user'))
   console.log('dash lay',data)

//    const location=useLocation()
//    const data=location.state
// console.log("object",data)

 return(
    <>
    {console.log('dash',userData)}
    </>
 )
}

export default Dashboard;

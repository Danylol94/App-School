import { Navigate, Route, Routes } from "react-router-dom";
import { useLoginStore } from "../store/useLoginStore";
import { Button } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { Class, Details, Payment } from "@mui/icons-material";
import { AgregarEstudiantes } from "../components/Students/AgregarEstudiantes";
import { Clases } from "../components/Clases/Clases"; 
import ReactPlayer from 'react-player'
import { Pagos } from "../components/Pagos/Pagos";

export function AdminSection (){
const {user} = useLoginStore(); 
const {logout} = useLoginStore();
   return(
    <>
   <link rel="stylesheet" href="index.css" />
  
   <header className="header"> 

   <div className="logo-header">
     
    </div>  

  <nav className="nav-menu">
      <ul>
            
          <li> <Link to="/admin-section/AgregarEstudiantes"> Alums </Link></li>
          <li><Link to="/admin-section/Clases">Class</Link></li>
          <li><Link to="/admin-section/Pagos">Payment</Link> </li>
          <li><Button onClick={() => logout()}>Salir</Button></li>
      </ul>
  </nav>
  </header>
 
 <section> 
 <Routes>
        
        <Route path='/AgregarEstudiantes' element={<AgregarEstudiantes/>}/>
        <Route path='/Clases' element={<Clases/>}/>
        <Route path='/Pagos' element={<Pagos/>}/>
      </Routes>

 </section>

 <br/>
 <br/>
 <br/>

<table>
 <tr>
  <td>¡WELCOME TO THE WOLRD OF MUSIC!</td>
  </tr>
  <br/>
  <tr>
  <td> <ReactPlayer url="https://www.youtube.com/shorts/CQR-Jb81l14"/> </td>
 </tr>

 </table>      
    </>
   );

}    




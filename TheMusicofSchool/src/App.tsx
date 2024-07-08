import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from "./section/Login";
import { AdminSection } from './section/AdminSection';
import { ProtectedRouter } from './components/ProtectedRouter';
import { useLoginStore } from './store/useLoginStore';
import { useEffect } from 'react';


//proteccion de rutas

function App() {
  const {login} = useLoginStore();
  const navigate = useNavigate();

  useEffect(() =>{
    const user = window.localStorage.getItem("user_token");
    if(user) {
      login(user);
      navigate("/admin-section")
    }
  }, []);

  return (
    <>
   
      <Routes>
        <Route path='/' element={<Login/>}/> 
        <Route element={<ProtectedRouter/>}>
        <Route path='/admin-section/*' element={<AdminSection/>}/>
        <Route path='/other-view' element={<h1>Otra pagina</h1>}/>
        </Route>
      </Routes>
      
    </>
  );
}

export default App;

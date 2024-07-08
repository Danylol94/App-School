import { Button } from "@mui/material";
import { Navigate, Route, useActionData } from "react-router-dom";
import {useForm} from 'react-hook-form' 
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import '../Students/Estudiantes.css';

 
const BASE_URL = "https://backend-subs-control.onrender.com/api/alumno";

interface IStudent{
    id: string;
    nombre: string;
    apellido: string;
    uuid: string;
}

export function AgregarEstudiantes(){
 
    const [students, setStudents] = useState<IStudent[]>([]);
    const [showNew, setShowNew] = useState<boolean>(false);
    const [selectedStudent, setSelectedStuden] = useState<IStudent | null>(null);

    useEffect(() =>{

    }, []);

    useEffect(() =>{
        fetch(BASE_URL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setStudents(data);
        });
    }, []);

    const handleDelete = (id:string) =>{
        const text = "¿Estas seguro que quieres eliminar?"; 
        if(confirm(text) === true){
            fetch(`${BASE_URL}/${id} `, {
                method: "DELETE",
            })
            .then((Response) => Response.json())
            .then(() =>{
                setStudents(students.filter((student) => student.id !== id));
            });
        }
    }
      
    const handleSubmit = (e: any) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const nombre = formData.get("nombre");
          const apellido = formData.get("apellido");
          
         
        if(selectedStudent){
            const bodyData ={
                id: selectedStudent.id,
                nombre,
                apellido: apellido,
                uuid: selectedStudent.uuid,
              };
            doPut(bodyData)
        } else{
            const bodyData ={
                nombre,
                apellido: apellido,
                uuid: crypto.randomUUID(),
              };
            doPost(bodyData);
        }
    };

    const doPut = (bodyData: any) =>{
        fetch(`${BASE_URL}/${bodyData.id} `, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
        //   setStudents([...students, data]);
         //   
         setStudents(
            students.map((student) =>
            student.id === data.id ? {...student, ...data} : student
            )
         );
         setShowNew(false);
        });
    }

    const doPost = (bodyData: any) => {
        fetch(BASE_URL, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        })
        .then((response) => response.json())
        .then((data) =>{
            setStudents([...students, data]);
            setShowNew(false);
        });
    }

    const handleUpdate = (student: IStudent) =>{
        setSelectedStuden(student);
        setShowNew(true);
    }

    return(
        <>
       <link rel="stylesheet" href="index.css" />
    
     
      <div className="container">
      <div className="form-content">
         
        <h1 id="title">MY ALUMS</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
            <div className="input-field" id="nameImput">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Nombre" name="nombre"/>
            </div>
            </div>
            
            <div className="input-group">
            <div className="input-field" id="nameImput">
                <i className="fa-solid fa-user"></i>
                <input type="text" placeholder="Apellido" name="apellido"/>
            </div>
            </div>
            <div className="btn-field">
            <button onClick={() => setShowNew(false)}>Eliminar</button>
            <button id="eliminar" type="submit">Guardar</button>
            
            </div>
        </form>
       
        </div>
        </div>
        
         
            <table>
            {students.map((student: IStudent) =>(
                <div key={student.id}>
                    <h2>
                     {student.nombre} {student.apellido}
                    </h2>
                    <p>{student.uuid}</p>
                <div style={{display: "flex", gap:"10px"}}>
                    <button onClick={() => handleDelete(student.id)}>Eliminar</button>
                    <button onClick={() => handleUpdate(student)}>Actualizar</button>
                </div>
                </div>
            ))}
            </table>
          
           <br/>
           <br/>
           <br/>
           <br/>

        </>
    );

}



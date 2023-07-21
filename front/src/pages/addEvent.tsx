
import EventForm from "@/components/eventsForm";
import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";


type FormularioData = {
    title: string;
    date: Date;
    init: number;
    end: number;
    participants: string[];
}
type initialValue = 
{date: string, init: number, end:number}

const AddEvent: NextPage = ()=>{
    const formatDateToYYYYMMDD = (fecha: string):string => {
        const date = new Date(fecha);
        // Verificar si se pudo crear un objeto Date válido
        if (isNaN(date.getTime())) {
          throw new Error("Fecha inválida");
        }
        // Obtener los componentes de la fecha
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        // Concatenar los componentes para obtener la fecha en formato "yyyy-mm-dd"
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
      };

    const createEvent = async (data: FormularioData) => {
        try{
            const res = await fetch(`http://localhost:4000/addEvent`,{
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(res.ok){
                console.log("Evento creado")
            }else{
                const error = await res.json()
                alert(error.message)
                console.log(error.message)
            }

        }catch(e){
            console.error(e)
        }
    }

    const InitialValue: initialValue = {
        date: formatDateToYYYYMMDD(new Date().toString()),
        init: new Date().getHours(),
        end: new Date().getHours() + 1,
    }

    return(
        <Main>
            <EventForm onSubmit={createEvent} initialValue={InitialValue} />
        </Main>
    )
}

export default AddEvent;

const Main =styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: grey;
    width: 100vw;
    height: 100vh;
`
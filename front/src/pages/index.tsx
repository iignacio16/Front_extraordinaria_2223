import EventList from "@/components/eventsList";
import { Evento } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Home() {
  const router = useRouter()
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

  const [events, setEvents] = useState<Evento[]>([]);
  const [day,setDay] = useState<number>(21)
  const [fecha, setFecha] = useState<string>(formatDateToYYYYMMDD(new Date().toString()));

  const fetchEvents = async () => {
    try{
      const res = await fetch(`http://localhost:4000/events?date=${fecha}`)
      const data: Evento[] = await res.json();
      if(res.ok){
        setEvents(data);
        console.log("Eventos bien")
      }else{         
        const error = await res.json()
        console.log(error.message);
      }
    }catch(e){
      console.error(e)
    }
  };
  const cambioFecha = (day:number) =>{
    const fechaNueva = fecha.split("-");
    const year = parseInt(fechaNueva[0]);
    const mes = parseInt(fechaNueva[1]);
    const newFecha = new Date(year, mes, day)
    setFecha(formatDateToYYYYMMDD(newFecha.toString()))
  }
  useEffect(()=>{
    cambioFecha(day)
  },[day]);

  useEffect(()=>{
    fetchEvents();
  },[fecha]);

  return (
    <Main> 
      <DivBotones>
        <Boton onClick={()=>{
          setDay(day - 1);
        }}>Dia anterior</Boton>
        <Boton
        onClick={()=>{
          setDay(day + 1);
        }}>Dia siguiente</Boton>
        <Boton onClick={()=>{
          router.push("/addEvent")
        }}>Añadir nuevo evento</Boton>
      </DivBotones>
      <EventList data={events}/>
    </Main>
  )
}

const Main = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items:center;
width: 100vw;
height: 100vh;
background-color: white;
`

const DivBotones = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`

const Boton = styled.div`
  display:flex;
  padding: 10px;
  text-align: center;
  font: bold;
  border: 1px solid black;
  border-radius: 3px;
  margin: 3px;
  background-color: #dbdada;
`
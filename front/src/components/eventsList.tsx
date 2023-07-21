import { Evento } from "@/types";
import styled from "styled-components";
import {FaTrash} from "react-icons/fa"
const EventList = ({ data }: { data: Evento[] }) => {
  const handleBorrar = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/deleteEvent/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("todo ok");
        window.location.reload();
      } else {
        const error = await res.json();
        console.log(error.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UL>
      {data.length === 0 && (
        <>
          <h1>{"[ ]"}</h1>
          <div>No hay eventos este dia</div>
        </>
      )}
      {data.map((event) => (
        <LI key={event.id}>
          <h1>{event.title}</h1>
          <p>Hora de inicio: {event.init}</p>
          <p>Hora final: {event.end}</p>
          <p>Participantes: {event.participants.map((p) => p)}</p>
          <BotonBorrar onClick={()=>handleBorrar(event.id)}>Borrar</BotonBorrar>
        </LI>
      ))}
    </UL>
  );
};
export default EventList;
const UL = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LI = styled.li`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 10px 10px;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin: 5px;
  width: 500px;
  height: auto;
    background-color: #f4f4f4;
`;

const BotonBorrar = styled.button`
  cursor: pointer;
  top: 2px;
  right: 2px;
  display: flex;
  padding: 5px;
  justify-content: flex-end;
  text-align: center;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px;
`;

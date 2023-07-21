import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components"

type FormularioData = {
    title: string;
    date: Date;
    init: number;
    end: number;
    participants: string[];
}

type EventFormProps = {
    onSubmit: (data: FormularioData) => void;
    initialValue: {date: string, init: number, end:number};
    message?: string;
  };

const EventForm: React.FC<EventFormProps>  = ({onSubmit, initialValue, message})=>{
    const [invitados, setInvitados] = useState<string[]>([])
    const [formularioData, setFormularioData] = useState<FormularioData>({
        title: "",
        date: new Date(initialValue.date),
        init: initialValue.init,
        end: initialValue.end,
        participants: []
    });
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
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormularioData({
          ...formularioData,
          [name]: value,
        });
      };

      const handleInvitados = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormularioData({
          ...formularioData,
          participants: value.split(","),
        });
      };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formularioData);
 
    } catch (error) {
      console.log(e);
    }
  };
  return(
    <Container>
    <h1>Añadir Evento</h1>
    <Form onSubmit={handleSubmit}>
    <Boton type="submit">Añadir</Boton>
    <Boton onClick={()=>router.push("/")}>Cancelar</Boton>
    <FormInput>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        onChange={handleChange}
        placeholder="Title"
        required
      />
    </FormInput>
    <FormInput>
      <label htmlFor="date">Fecha: </label>
      <input
        type="date"
        id="date"
        name="date"
        value={formatDateToYYYYMMDD(formularioData.date.toString())}
        onChange={handleChange}
        placeholder="date"
        required
      />
    </FormInput>
    <FormInput>
      <label htmlFor="init">Hora inicio</label>
      <input
        type="number"
        id="init"
        name="init"
        defaultValue={formularioData.init}
        onChange={handleChange}
        placeholder="Inicio"
        required
      />
    </FormInput>
    <FormInput>
      <label htmlFor="end">Hora fin: </label>
      <input
        type="number"
        id="end"
        name="end"
        defaultValue={formularioData.end}
        onChange={handleChange}
        placeholder="fin"
        required
      />
    </FormInput>
    <FormInput>
      <label htmlFor="Participants">Invitados: (separados por ,)</label>
      <input
        type="text"
        id="participants"
        name="participants"
        onChange={handleInvitados}
        placeholder="Participantes"
        required
      />
    </FormInput>
  </Form>
  </Container>
  )
}
export default EventForm;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    justify-content: center;
    background-color: #b1aeae;
    border: 2px solid black;
    box-shadow: 5px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    color: #0d72fe;
    margin-bottom: 5px;
  }

  input {
    padding: 5px;
    border: 1px solid #0d72fe;
    border-radius: 5px;
    width: 200px;
  }
`;

const Boton = styled.button`
  cursor: pointer;
  background-color: #0d72fe;
  color: white;
  padding: 5px 1%;
  border: 1px solid black;
  border-radius: 5px;
  margin: 9px;
`;

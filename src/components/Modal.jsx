import { useState, useEffect } from "react"
import Mensaje from "./Mensaje"
import CerrarBtn from '../img/cerrar.svg'



const Modal = ({
    setModal, 
    animarModal,
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar
    }) => {

    const [mensaje,setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
      //Comprobamos si esta variable cambia de verdad
      if(Object.keys(gastoEditar).length >0 ){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
    },[gastoEditar])

    const ocultarModal = ()=>{
        
        setAnimarModal(false)
        //Con esto si no moficamos nada, este lo vaciara para que cuando abra
        //No vuelva a cargar la edicion anterior
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
          }, 600);
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        if([nombre,cantidad, categoria].includes('')){
            
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
              }, 3000);
            return
        }
        guardarGasto({nombre,cantidad,categoria, fecha, id})
        
    }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
            src={CerrarBtn}
            alt="Cerrar Modal"
            onClick={ocultarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit} 
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
        >

        <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Guardar Gasto'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
            <label htmlFor="nombre">Nombre de Gasto</label>
            <input 
                id="nombre"
                type="text" 
                placeholder="Añade el nombre del gasto"
                value={nombre}
                onChange={e => {setNombre(e.target.value)}}
            />
        </div>

        <div className="campo">
            <label htmlFor="cantidad">Cantidad</label>
            <input 
                id="cantidad"
                type="number" 
                placeholder="Añade la cantidad del gasto: ej. 300"
                value={cantidad}
                onChange={e => {setCantidad(Number(e.target.value))}}
            />
        </div>

        <div className="campo">
        <label htmlFor="categoria">Categoria</label>
        <select 
            id="categoria"
            value={categoria}
            onChange={e => {setCategoria(e.target.value)}}
        >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
        </select>  
        </div>

        <input 
        type="submit"
        value={gastoEditar.nombre ? "Guardar Cambios":"Añadir Gastos"} />

      </form>
    </div>
  )
}

export default Modal

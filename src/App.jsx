import { object } from 'prop-types'
import { useState, useEffect } from 'react'
import Filtros from './components/Filtros'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'




function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    //Comprobamos si existe,si existe lo parsea y sino lo hace vacio
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=>{
    //Comprobamos si esta variable cambia de verdad
    if(Object.keys(gastoEditar).length >0 ){
      //Si hay algo llamamos el modal
      setModal(true)
      setTimeout(() => {
       setAnimarModal(true)
     }, 500);
    }
  },[gastoEditar])

  //Lo guardamos en LocalStorage
  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])

  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos)?? [])
  },[gastos])

  //Vamos a ir grabando cuando el presupuesto cambie
  useEffect(()=>{

  },[presupuesto])

  useEffect(()=>{
    if (filtro){
      //Filtrar gastos por categorias
      const gastrosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastrosFiltrados)
    }
  },[filtro])

  //Revisamos el localstore y si hay algun valor, pasamos directamente a la otra pantalla
  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) 
    if(presupuestoLS>0){
      setIsValidPresupuesto(true)
    }
  },[])

  const handleNuevoGasto = () =>{
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    
  }

  const guardarGasto = gasto =>{
    //Si hay un gasto con id, estamos actualizando
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else {
      //Nuevo gasto
      gasto.id = generarId()
      gasto.fecha=Date.now()
      setGastos([...gastos, gasto])
      
    }

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
      }, 600);
  }

  const eliminarGasto = id =>{ 
    //Filter solo trae todos los datos que sean diferentes
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    /*Todos los que son diferentes los volvemos a guardar y
    y de esa manera lo borramos*/
    setGastos(gastosActualizados)
  }
  
  return (
    <div className={modal ? 'fijar': null }>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
        <main>
        <Filtros
          filtro={filtro}
          setFiltro={setFiltro}
        />
        <ListadoGastos 
          gastos={gastos}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          gastosFiltrados={gastosFiltrados}
          filtro={filtro}
          
        />
        </main>
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt="Icono Nuevo Gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

        {modal && 
        <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        />}
    </div>


  )
}

export default App

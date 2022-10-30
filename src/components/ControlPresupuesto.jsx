import React, { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto,gastos, setGastos, setPresupuesto,setIsValidPresupuesto}) => {

    const [porcentaje,setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)


   
  
    //Formatea un numero a cantidad sin modificarlo
    const formatearNumero = (e) =>{
        return e.toLocaleString('en-US',{
            style: 'currency',
            currency: 'EUR'
        })
    }
    
    useEffect(()=>{
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total,0)
        const totalDisponible=(presupuesto-totalGastado)
        //Calculo del porcentaje
        const nuevoPorcentaje=(((presupuesto -totalDisponible)/ presupuesto)*100).toFixed(2);
        
       
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 200);

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])
    
    const handleResetApp = ()=>{
        
        const resultado = confirm('Deseas reiniciar la App')
        if(resultado){

            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
    

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
       <CircularProgressbar 
        value={porcentaje} 
        text={`${porcentaje}% Gastado`} 
        styles={buildStyles({
            pathColor: porcentaje > 100 ? '#db2777' : '#3B82f6',
            trailColor: '#f5f5f5',
            pathTransitionDuration: 1,
            textColor: porcentaje > 100 ? '#db2777' : '#3B82f6'
        })}
      />
        <div className='contenido-presupuesto'>
            <button 
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear Presupuesto
            </button>
            <p>
                <span>Presupuesto: </span>{formatearNumero(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : null}`}>
                <span>Disponible: </span>{formatearNumero(disponible)}
 
            </p>
            <p>
                <span>Gastado: </span> {formatearNumero(gastado)}
            </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto

import { formatearFecha } from "../helpers"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

import ahorro from '../img/icono_ahorro.svg'
import casa from '../img/icono_casa.svg'
import comida from '../img/icono_comida.svg'
import gastos from '../img/icono_gastos.svg'
import ocio from '../img/icono_ocio.svg'
import salud from '../img/icono_salud.svg'
import suscripciones from '../img/icono_suscripciones.svg'


const diccionarioIcono = {
    ahorro,
    casa,
    comida,
    gastos,
    ocio,
    salud,
    suscripciones,
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {
    
    const {nombre,cantidad,categoria,id, fecha} = gasto

    const leadingActions = () => (
    <LeadingActions>
        <SwipeAction onClick={() => setGastoEditar(gasto)}>
            Editar
        </SwipeAction>
    </LeadingActions>
    )
    const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => eliminarGasto(id)}
          >
            Eliminar
          </SwipeAction>
        </TrailingActions>
      )

  return (
    <SwipeableList>
        <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
        >
            <div className='gasto sombra'>
                <div className='contenido-gasto'>
                <img 
                    src={diccionarioIcono[categoria]}
                                
                    alt="Icono Ocio"   
                />
                    <div className='descripcion-gasto'>
                        <p className='categoria'>{categoria}</p>
                        <p className='nombre-gasto'>{nombre}</p>
                        <p className='fecha-gasto'>
                            Agregado el:{' '}
                            <span>
                                {formatearFecha(fecha)}
                            </span>
                        </p>
                    </div>
                </div>
                <p className="cantidad-gasto">€{' '}{cantidad}</p>
            </div>
        </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto

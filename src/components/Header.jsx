import ControlPresupuesto from "./ControlPresupuesto"
import NuevaPresupuesto from "./nuevaPresupuesto"


const Header = ({
  presupuesto, 
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
  }) => {
  return (
    <header>
      <h1>Planificador de Gastos</h1>

      {isValidPresupuesto ? 
      (
        <ControlPresupuesto
        setIsValidPresupuesto={setIsValidPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
        />
        )
    :(

      <NuevaPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
    )}

    </header>
  )
}

export default Header

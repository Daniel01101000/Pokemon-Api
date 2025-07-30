import Buttons from '../Buttons/Buttons.jsx';
import '../Header/Header.css'; // Sigue usando los estilos ya definidos
import './DropdownMenu.css';
import './Menu.css';

function Menu({ menuAbierto, toggleMenu, onFilterChange }) {
  return (
    <div className="menu-hamburguesa">
      <button
        className="hamburguesa-boton"
        onClick={toggleMenu}
        aria-label="Abrir menú"
        aria-expanded={menuAbierto}
      >
        <i className="bi bi-list"></i>
      </button>

      <div className={`menu-desplegable ${menuAbierto ? 'abierto' : ''}`}>
        <Buttons onFilterChange={onFilterChange} />
      </div>
    </div>
  );
}

export default Menu;
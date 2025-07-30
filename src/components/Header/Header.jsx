import { useEffect, useState } from 'react';
import Buttons from '../Buttons/Buttons.jsx';
import Menu from '../Menu/Menu.jsx';
import './Header.css';
import Pokeball from '/Pokeball.png';

function Header({ onFilterChange }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [esPantallaPequena, setEsPantallaPequena] = useState(window.innerWidth < 530);

  useEffect(() => {
    const manejarCambioTamaño = () => {
      setEsPantallaPequena(window.innerWidth < 530);
    };

    window.addEventListener('resize', manejarCambioTamaño);
    return () => window.removeEventListener('resize', manejarCambioTamaño);
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(prev => !prev);
  };

  return (
    <header className='app-header'>
      <div className='logo-container'>
        <img src={Pokeball} alt="Pokeball" className="header-logo" />
        <h1 className="header-title">Pokédex</h1>
      </div>

      {esPantallaPequena ? (
        <Menu
          menuAbierto={menuAbierto}
          toggleMenu={toggleMenu}
          onFilterChange={onFilterChange}
        />
      ) : (
        <div className="header-buttons">
          <Buttons onFilterChange={onFilterChange} />
        </div>
      )}
    </header>
  );
}

export default Header;
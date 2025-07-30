import './Buttons.css';

function Buttons({ onFilterChange }) {
  const tipos = [
    'all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting',
    'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
    'dark', 'dragon', 'steel', 'fairy'
  ];

  return (
    <nav className="nav">
      <ul className="nav-list">
        {tipos.map(tipo => (
          <li className="nav-item" key={tipo}>
            <button
              className={`btn btn-header ${tipo !== 'all' ? tipo : ''}`}
              onClick={() => onFilterChange(tipo === 'all' ? 'all' : tipo)}
            >
              {tipo === 'all' ? 'All' : tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Buttons;
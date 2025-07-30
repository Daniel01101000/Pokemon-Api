import './Types.css';

const Types = ({ types }) => {
  if (!types || types.length === 0) return null;

  return (
    <div className="types-container">
      {types.map((typeName, index) => (
        <span key={index} className={`type ${typeName}`}>
          {typeName}
        </span>
      ))}
    </div>
  );
};

export default Types;
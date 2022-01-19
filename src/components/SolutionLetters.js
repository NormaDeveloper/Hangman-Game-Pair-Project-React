import '../styles/components/_letters.scss';
function SolutionLetters(props) {
  return (
    <div className="solution">
      <h2 className="title">Solución:</h2>
      <ul className="letters">{props.fun}</ul>
    </div>
  );
}

export default SolutionLetters;

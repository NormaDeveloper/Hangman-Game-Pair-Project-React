import '../styles/index.scss';
import '../styles/App.scss';
import { useState, useEffect } from 'react';
import object from '../services/fetch'


function App() {

  const [lastLetter, setLastLetter] = useState('');
  const [userLetter, setUserLetters] = useState([]);
  const [word, setWord] = useState('');
   
 
   
  useEffect ( ()=> {
    object.getWordFromApi()
    .then(dataFromApi  => setWord(dataFromApi.body.Word)) ;
  }, []);
  
  const callToApi = () => {
    object.getWordFromApi()
    .then(dataFromApi  => setWord(dataFromApi.body.Word))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChangeLetter = (event) => {
    const regex = /^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$/;
    if (event.target.value.match(regex) ){
      setLastLetter(event.target.value);
      if (lastLetter !== ''){
        const newLetter = [...userLetter, lastLetter];
        setUserLetters(newLetter)
      }
    }
    
  };

  const restartGame = () => {
    setLastLetter('');
    setUserLetters([]);
    callToApi();
  }

  const endGame = () => {
    const wordLetters = word.split('');
    const correctLetters = wordLetters.filter(eachLetter => userLetter.includes(eachLetter));
    const errorLetters = userLetter.filter(eachLetter => !wordLetters.includes(eachLetter));
    if (correctLetters.length === wordLetters.length){
      return <section className="end"><p className="end__message">¡Has ganado!</p><button className="end__btn" onClick={restartGame}>Reiniciar juego</button></section>
    }
    if (errorLetters.length === 13){
      return <section className="end"><p className="end__message">¡Has perdido! La solución era {word}</p><button className="end__btn" onClick={restartGame}>Volver a jugar</button></section>
    } 
  }

  const renderSolutionLetters = () => {
    let letter = '';
    const wordLetters = word.split('');
    return wordLetters.map( (eachLetter, index) => {
      if (userLetter.includes(eachLetter)) {
        return <li key={index} className="letter">{eachLetter}</li>
      } else {
        return <li key={index} className="letter">{letter}</li>
      }
    } )
  }

  const renderErrorLettters = () => {
    const wordLetters = word.split('');
    const errorLetters = userLetter.filter(eachLetter => !wordLetters.includes(eachLetter));
    return errorLetters.map( (eachLetter, index) => 
      <li key={index} className="letter">{eachLetter}</li>
    )
  }

  const calculateErorNumber = () => {
    const wordLetters = word.split('');
    const errorLetters = userLetter.filter(eachLetter => !wordLetters.includes(eachLetter));
    if (errorLetters.length <= 13){
      return errorLetters.length;
    }
  }

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {renderErrorLettters()}
            </ul>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange={handleChangeLetter}
              value={lastLetter}
            />
          </form>
        </section>
        <div className="end__container">
        <section className={`dummy error-${calculateErorNumber()}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
        {endGame()}
        </div>
      </main>
    </div>
  );
}

export default App;

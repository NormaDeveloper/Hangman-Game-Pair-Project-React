import '../styles/index.scss';
import '../styles/App.scss';
import { useState, useEffect } from 'react';
import object from '../services/fetch';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';


function App() {
  const [lastLetter, setLastLetter] = useState('');
  const [userLetter, setUserLetters] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    object
      .getWordFromApi()
      .then((dataFromApi) => setWord(dataFromApi.body.Word));
  }, []);

  const callToApi = () => {
    object
      .getWordFromApi()
      .then((dataFromApi) => setWord(dataFromApi.body.Word));
  };

  

  const handleChangeLetter = (event) => {
    const regex = /^[a-zA-ZáäéëíïóöúüÁÄÉËÍÏÓÖÚÜñÑ]?$/;
    if (event.target.value.match(regex)) {
      setLastLetter(event.target.value);
      if (lastLetter !== '') {
        const newLetter = [...userLetter, lastLetter];
        setUserLetters(newLetter);
      }
    }
  };

  const restartGame = () => {
    setLastLetter('');
    setUserLetters([]);
    callToApi();
  };

  const endGame = () => {
    const wordLetters = word.split('');
    const correctLetters = wordLetters.filter((eachLetter) =>
      userLetter.includes(eachLetter)
    );
    const errorLetters = userLetter.filter(
      (eachLetter) => !wordLetters.includes(eachLetter)
    );
    if (correctLetters.length === wordLetters.length) {
      return (
        <section className="end">
          <p className="end__message">¡Has ganado!</p>
          <button className="end__btn" onClick={restartGame}>
            Reiniciar juego
          </button>
        </section>
      );
    }
    if (errorLetters.length === 13) {
      return (
        <section className="end">
          <p className="end__message">¡Has perdido! La solución era {word}</p>
          <button className="end__btn" onClick={restartGame}>
            Volver a jugar
          </button>
        </section>
      );
    }
  };

  const renderSolutionLetters = () => {
    let letter = '';
    const wordLetters = word.split('');
    return wordLetters.map((eachLetter, index) => {
      if (userLetter.includes(eachLetter)) {
        return (
          <li key={index} className="letter">
            {eachLetter}
          </li>
        );
      } else {
        return (
          <li key={index} className="letter">
            {letter}
          </li>
        );
      }
    });
  };

  const renderErrorLettters = () => {
    const wordLetters = word.split('');
    const errorLetters = userLetter.filter(
      (eachLetter) => !wordLetters.includes(eachLetter)
    );
    return errorLetters.map((eachLetter, index) => (
      <li key={index} className="letter">
        {eachLetter}
      </li>
    ));
  };

  const calculateErorNumber = () => {
    const wordLetters = word.split('');
    const errorLetters = userLetter.filter(
      (eachLetter) => !wordLetters.includes(eachLetter)
    );
    if (errorLetters.length <= 13) {
      return errorLetters.length;
    }
  };

  return (
    <div className="page">
      <Header text="Juego del ahorcado" />

      <main className="main">
        <section>
          <SolutionLetters fun={renderSolutionLetters()} />

          <ErrorLetters fun={renderErrorLettters()} />
          <Form lastLetter={lastLetter} handleChangeLetter={handleChangeLetter} />
          
        </section>
        <div className="end__container">
          <Dummy fun={calculateErorNumber()} />
          {endGame()}
        </div>
      </main>
    </div>
  );
}

export default App;

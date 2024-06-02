'use client'

import { getDiceIcon } from '@/utils/diceIcons';
import { useState, useEffect } from "react";
import ButtonGame from './buttonGame';

export default function GameRollDice() {
  let [numberOfDices, setNumberOfDices] = useState<number>(1);
  let [diceValues, setDiceValues] = useState<(number | null)[]>([null]);    
  let [targetScore, setTargetScore] = useState<number>(0);
  let [rollResult, setRollResult] = useState<number>(0);
  let [highScore, setHighScore] = useState<number>(0);
  let [numberOfRolls, setNumberOfRolls] = useState<number>(0);
  let [gameStatus, setGameStatus] = useState<string>('');
  let [gameStep, setGameStep] = useState<number>(1);
  let [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    handleGameInfo();
  }, [rollResult, numberOfRolls]);

  const Dice = () => {
    const diceElements = diceValues.map((value, i) => (
      <div key={i} className="h-20 w-20 flex justify-center items-center" >
        {value !== null ? getDiceIcon(value) : null}
      </div>
    ));
    return <div className="flex gap-4">{diceElements}</div>;
  };

  const Scoreboard = () => {
    return (
      <>
      <div className="w-[620px] mx-auto flex items-center justify-center gap-8 text-center text-5xl" style={{ backgroundImage: `url(/images/scoreboard.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <img src='/images/dice-light.png' className='w-60 h-52'/>
        <div>Target <br /> Score</div>
        <div>{targetScore}</div>
      </div>
      <div className='flex justify-center gap-14 text-2xl mt-5 text-center'>
        <div>High Score: {highScore}</div>
        <div className='border-[1px] border-white'></div>
        <div>Number of Rolls: {numberOfRolls}</div>
      </div>
      </>
    );
  };

  const Menu = () => {
    return (
      <div className="w-full flex flex-col gap-6 items-center">
        <img src='/images/dice-light.png' className='w-60 h-52'/>
        <label htmlFor="numberOfDices" className='text-5xl'>Select the number of dices</label>
        <input type="number" name="numberOfDices" className="border-4 border-blue-400 bg-transparent flex text-6xl text-center" value={numberOfDices} onChange={handleNumberOfDices} max={20} min={1}/>
        <ButtonGame onClick={startGame} variant='primary'>Start Game</ButtonGame>
      </div>
    );
  };

  function handleNumberOfDices(e: { target: { value: string; }; }) {
    const value = parseInt(e.target.value);
    setNumberOfDices(value);
  };

  function generateTargetScore() {
    let totalScore = 0;
    for (let i = 0; i < numberOfDices; i++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      totalScore += randomNumber;
    }
    setTargetScore(totalScore);
    setNumberOfRolls(0);
    setHighScore(0);
    setGameStatus('');
  }
  
  function rollingDice() {
    setIsRolling(true);
  
    const interval = 100; // Intervalo de tiempo entre cambios de imagen (en milisegundos)
    const totalFrames = 10; // Número total de imágenes para cambiar (duración total / intervalo)
  
    let currentFrame = 0;
    const diceAnimation = setInterval(() => {
      const newDiceValues = [];
      for (let i = 0; i < numberOfDices; i++) {
        const randomNumber = Math.floor(Math.random() * 6) + 1; // Generar un número aleatorio del 1 al 6
        newDiceValues.push(randomNumber);
      }
      setDiceValues(newDiceValues);
      currentFrame++;
  
      if (currentFrame === totalFrames) {
        clearInterval(diceAnimation);
        const totalScore = newDiceValues.reduce((acc, curr) => acc + curr, 0);
        setRollResult(totalScore);
        setNumberOfRolls(prevRolls => prevRolls + 1);
        setIsRolling(false);
      }
    }, interval);
  }
  

  function handleGameInfo() {
    if (rollResult > highScore) {
      setHighScore(rollResult);
      sessionStorage.setItem('highScore', JSON.stringify(rollResult));
      setGameStatus('You set your new high score!');
    } else {
      setGameStatus('You didn`t get it! Try again!');
    }

    if (numberOfRolls === 3) {
      if (highScore > targetScore) {
        setGameStatus('Congratulations! You won the Game!');
      } else {
        setGameStatus('Game over. Do you want to try again?');
      }
    }
  }

  function startGame() {
    generateTargetScore();
    setGameStep(2);
    sessionStorage.setItem('highScore', '');
  }

  function resetGame() {
    setNumberOfDices(1);
    setDiceValues([null]);
    setTargetScore(0);
    setRollResult(0);
    setHighScore(0);
    setNumberOfRolls(0);
    setGameStatus('');
    setGameStep(1);
    sessionStorage.removeItem('highScore');
  }

  return (
    <main style={{ backgroundImage: `url(/images/wall-blue.jpeg)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='w-full h-screen text-white pt-20'>
      {gameStep === 1 ? (
        <Menu />
      ) : (
        <>
          <Scoreboard />
          <div className='flex items-center flex-col gap-6 mt-10'>
            <Dice />
            <div>{gameStatus}</div>
            <div className='flex items-center gap-2 '>
              <ButtonGame onClick={rollingDice} variant='secondary'>Roll the dice</ButtonGame>
              <br />
              <ButtonGame onClick={resetGame} variant='terciary'>Restart Game</ButtonGame>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

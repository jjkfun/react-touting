import { useEffect, useState } from "react"; // хук, берется из react
import "./App.css";
import SingleCard from "./components/SingleCard/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", mached: false },
  { src: "/img/potion-1.png", mached: false },
  { src: "/img/ring-1.png", mached: false },
  { src: "/img/scroll-1.png", mached: false },
  { src: "/img/shield-1.png", mached: false },
  { src: "/img/sword-1.png", mached: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setShoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setChoiceTwo(null);
    setChoiceOne(null);
  };

  const handleChoise = (card) => {
    console.log(card);

    if (choiseOne) {
      setChoiseTwo(card);
    } else {
      setShoiseOne(card);
    }
  };

  const resetTurn = () => {
    setShoiseOne(null);
    setChoiseTwo(null);
    setDisabled(false);

    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiseOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

  return (
    <div className="App">
      <h1>Магическая Битва</h1>
      <button onClick={shuffleCards}>Новая игра!</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Количество ходов: {turns}</p>
    </div>
  );
}

export default App;

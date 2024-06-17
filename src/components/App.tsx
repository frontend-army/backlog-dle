import { useState } from "react";

type Game = {
  name: string;
  category: string;
  link: string
}

function App() {
  const storedGames = localStorage.getItem('games');

  const [games, setGames] = useState<Game[]>(storedGames ? JSON.parse(storedGames).games : []);
  const [isNewGameModalVisible, setIsNewGameModalVisible] = useState(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newGame: Record<string, string> = {};
    formData.forEach(function (value, key) {
      newGame[key] = value as string;
    });
    const newGames = [...games, newGame as Game];

    setGames(newGames);
    localStorage.setItem('games', JSON.stringify({
      games: newGames
    }))

    setIsNewGameModalVisible(false);
  }

  return (
    <>
      <h1>Backlog-dle</h1>
      {games.map(game => (
        <article>
          <h4>{game.name}</h4>
          <a href={game.link} target="_blank">Jugar</a>
        </article>
      ))}
      <button onClick={() => setIsNewGameModalVisible(true)}>Agregar Juego</button>
      <dialog open={isNewGameModalVisible}>
        <article>
          <header>
            <button aria-label="Close" rel="prev" onClick={() => setIsNewGameModalVisible(false)}></button>
            <p>
              <strong>Agregar juego</strong>
            </p>
          </header>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                Nombre del juego
                <input type="text" name="name" placeholder="Wordle" />
              </label>
              <label>
                Categoria
                <input type="text" name="category" placeholder="Palabras" />
              </label>
              <label>
                Link
                <input type="text" name="link" placeholder="https://lapalabradeldia.com/" />
              </label>
            </fieldset>
            <input type="submit" value="Agregar" />
          </form>
        </article>
      </dialog>
    </>
  )
}

export default App

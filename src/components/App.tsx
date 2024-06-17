import { useState } from "react";
import styles from "./App.module.css";

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

    event.currentTarget.reset();
    setIsNewGameModalVisible(false);
  }

  return (
    <>
      <h1>Backlog-dle</h1>
      {games.map(game => (
        <article>
          <h4>{game.name}</h4>
          <div className={styles.play}>
            <a href={game.link} target="_blank">Jugar</a>
            {/* <input type="checkbox" name="played" checked /> */}
          </div>
          <footer>
            <button
              className="outline"
              onClick={() => {
                const newGames = games.filter(g => g.name !== game.name);
                setGames(newGames);
                localStorage.setItem('games', JSON.stringify({
                  games: newGames
                }))
              }}>Eliminar</button>
          </footer>
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
                <input required type="text" name="name" placeholder="Wordle" />
              </label>
              <label>
                Categoria
                <input required type="text" name="category" placeholder="Palabras" />
              </label>
              <label>
                Link
                <input required type="text" name="link" placeholder="https://lapalabradeldia.com/" />
              </label>
            </fieldset>
            <input type="submit" value="Agregar" />
            <button className="outline" onClick={() => setIsNewGameModalVisible(false)} >Cancelar</button>          </form>
        </article>
      </dialog>
    </>
  )
}

export default App

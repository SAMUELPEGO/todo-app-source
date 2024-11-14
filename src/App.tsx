import { useContext } from 'react'
import styles from './App.module.css'
import Todo from './components/todo'
import { ThemeContext } from './context/theme_context'
const App: React.FC = () => {
const {theme} = useContext(ThemeContext)
  return (
    <>
    <main className={`${styles.main} ${theme + "-theme"}`}>
     <img src="images/bg-desktop-dark.jpg" alt=""  className={styles.bg_img}/>
     <Todo/>
    </main>
    </>
  )
}

export default App

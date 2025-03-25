import styles from '../styles/Header.module.css';

const Header = ({ resetBoard }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Trello Clone</div>
      <button 
        onClick={resetBoard} 
        className={styles.resetButton}
      >
        Reset Board
      </button>
    </header>
  );
};

export default Header;
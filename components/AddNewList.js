import { useState } from 'react';
import styles from '../styles/List.module.css';

const AddNewList = ({ addList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleAddList = () => {
    if (title.trim()) {
      addList(title);
      setTitle('');
      setIsAdding(false);
    }
  };

  if (isAdding) {
    return (
      <div className={`${styles.list} ${styles.addList}`}>
        <input
          type="text"
          placeholder="Enter list title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
          autoFocus
        />
        <div className={styles.addListActions}>
          <button 
            onClick={handleAddList} 
            className={styles.addButton}
          >
            Add List
          </button>
          <button 
            onClick={() => setIsAdding(false)} 
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.list} ${styles.addListPlaceholder}`}
      onClick={() => setIsAdding(true)}
    >
      + Add another list
    </div>
  );
};

export default AddNewList;
import { useState } from 'react';
import styles from '../styles/CardModal.module.css';

const CardModal = ({ card, listId, updateCard, deleteCard, onClose }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate || '');

  const handleSave = () => {
    updateCard(listId, card.id, {
      title,
      description,
      dueDate
    });
    onClose();
  };

  const handleDelete = () => {
    deleteCard(listId, card.id);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === styles.modalOverlay) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.titleInput}
          />
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.field}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={styles.dateInput}
            />
          </div>
          
          <div className={styles.field}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a more detailed description..."
              className={styles.descriptionInput}
              rows={5}
            />
          </div>
        </div>
        
        <div className={styles.modalFooter}>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete Card
          </button>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
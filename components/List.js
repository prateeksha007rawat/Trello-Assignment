import { useState, useRef } from 'react';
import Card from './Card';
import { useDrag, useDrop } from 'react-dnd';
import styles from '../styles/List.module.css';

const List = ({ 
  list, 
  index, 
  deleteList, 
  updateListTitle, 
  addCard, 
  updateCard, 
  deleteCard, 
  moveCard, 
  reorderLists 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  
  const ref = useRef(null);

  // List drag and drop setup
  const [{ isDragging }, drag] = useDrag({
    type: 'LIST',
    item: { id: list.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'LIST',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Reorder the lists
      reorderLists(dragIndex, hoverIndex);
      
      // Update the item's index for future drags
      item.index = hoverIndex;
    },
  });

  // Setup for card dropping
  const [, cardDrop] = useDrop({
    accept: 'CARD',
    drop(item) {
      if (item.listId !== list.id) {
        moveCard(item.listId, list.id, item.id, list.cards.length);
      }
    },
  });

  // Combine the refs
  drag(drop(ref));
  cardDrop(ref);

  const handleTitleUpdate = () => {
    updateListTitle(list.id, title);
    setIsEditing(false);
  };

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle);
      setNewCardTitle('');
      setShowAddCard(false);
    }
  };

  return (
    <div 
      className={styles.list} 
      ref={ref} 
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={styles.listHeader}>
        {isEditing ? (
          <div className={styles.titleEditContainer}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              autoFocus
            />
            <button onClick={handleTitleUpdate} className={styles.saveButton}>
              Save
            </button>
          </div>
        ) : (
          <div className={styles.titleContainer}>
            <h3 className={styles.title} onClick={() => setIsEditing(true)}>
              {list.title}
            </h3>
            <button 
              onClick={() => deleteList(list.id)} 
              className={styles.deleteButton}
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className={styles.cardContainer}>
        {list.cards.map((card, cardIndex) => (
          <Card
            key={card.id}
            card={card}
            listId={list.id}
            index={cardIndex}
            updateCard={updateCard}
            deleteCard={deleteCard}
            moveCard={moveCard}
          />
        ))}
      </div>

      {showAddCard ? (
        <div className={styles.addCardContainer}>
          <input
            type="text"
            placeholder="Enter card title..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className={styles.cardInput}
            autoFocus
          />
          <div className={styles.addCardActions}>
            <button 
              onClick={handleAddCard} 
              className={styles.addButton}
            >
              Add Card
            </button>
            <button 
              onClick={() => setShowAddCard(false)} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowAddCard(true)} 
          className={styles.addCardButton}
        >
          + Add a card
        </button>
      )}
    </div>
  );
};

export default List;
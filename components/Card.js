import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CardModal from './CardModal';
import styles from '../styles/Card.module.css';

const Card = ({ card, listId, index, updateCard, deleteCard, moveCard }) => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  // Setup drag for the card
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, listId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Setup drop for reordering cards
  const [, drop] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceListId = item.listId;
      const targetListId = listId;
      
      // Don't replace items with themselves in the same list
      if (dragIndex === hoverIndex && sourceListId === targetListId) {
        return;
      }

      // Move the card
      moveCard(sourceListId, targetListId, item.id, hoverIndex);
      
      // Update the item's position for future drags
      item.index = hoverIndex;
      item.listId = targetListId;
    },
  });

  // Combine refs
  drag(drop(ref));

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div
        className={styles.card}
        ref={ref}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={() => setShowModal(true)}
      >
        <div className={styles.cardTitle}>{card.title}</div>
        {card.dueDate && (
          <div className={styles.dueDate}>
            Due: {formatDueDate(card.dueDate)}
          </div>
        )}
      </div>

      {showModal && (
        <CardModal
          card={card}
          listId={listId}
          updateCard={updateCard}
          deleteCard={deleteCard}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Card;
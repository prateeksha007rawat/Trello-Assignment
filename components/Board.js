import { useRef } from 'react';
import List from './List';
import AddNewList from './AddNewList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from '../styles/Board.module.css';

const Board = ({ 
  lists, 
  addList, 
  deleteList, 
  updateListTitle, 
  addCard, 
  updateCard, 
  deleteCard, 
  moveCard, 
  reorderLists 
}) => {
  const boardRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.boardContainer}>
        <div className={styles.board} ref={boardRef}>
          {lists.map((list, index) => (
            <List
              key={list.id}
              list={list}
              index={index}
              deleteList={deleteList}
              updateListTitle={updateListTitle}
              addCard={addCard}
              updateCard={updateCard}
              deleteCard={deleteCard}
              moveCard={moveCard}
              reorderLists={reorderLists}
            />
          ))}
          <AddNewList addList={addList} />
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Board from '../components/Board';

export default function Home() {
  // Main state for the board
  const [lists, setLists] = useState([]);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const savedLists = localStorage.getItem('trello-lists');
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  // Save data to localStorage whenever lists change
  useEffect(() => {
    localStorage.setItem('trello-lists', JSON.stringify(lists));
  }, [lists]);

  // Function to add a new list
  const addList = (title) => {
    const newList = {
      id: Date.now().toString(),
      title,
      cards: []
    };
    setLists([...lists, newList]);
  };

  // Function to delete a list
  const deleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  // Function to update a list title
  const updateListTitle = (listId, newTitle) => {
    setLists(lists.map(list => 
      list.id === listId ? { ...list, title: newTitle } : list
    ));
  };

  // Function to add a card to a list
  const addCard = (listId, cardTitle) => {
    const newCard = {
      id: Date.now().toString(),
      title: cardTitle,
      description: '',
      dueDate: null
    };
    
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, cards: [...list.cards, newCard] } 
        : list
    ));
  };

  // Function to update a card
  const updateCard = (listId, cardId, updatedCard) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            cards: list.cards.map(card => 
              card.id === cardId ? { ...card, ...updatedCard } : card
            ) 
          } 
        : list
    ));
  };

  // Function to delete a card
  const deleteCard = (listId, cardId) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, cards: list.cards.filter(card => card.id !== cardId) } 
        : list
    ));
  };

  // Function to handle moving cards (drag and drop)
  const moveCard = (sourceListId, destinationListId, cardId, destinationIndex) => {
    // Find the card to move
    const sourceList = lists.find(list => list.id === sourceListId);
    const cardToMove = sourceList.cards.find(card => card.id === cardId);
    
    // Remove card from source list
    const sourceListWithoutCard = {
      ...sourceList,
      cards: sourceList.cards.filter(card => card.id !== cardId)
    };
    
    // Add card to destination list at the specific index
    const updatedLists = lists.map(list => {
      if (list.id === sourceListId) {
        return sourceListWithoutCard;
      }
      if (list.id === destinationListId) {
        const newCards = [...list.cards];
        newCards.splice(destinationIndex, 0, cardToMove);
        return { ...list, cards: newCards };
      }
      return list;
    });
    
    setLists(updatedLists);
  };

  // Function to reorder lists
  const reorderLists = (sourceIndex, destinationIndex) => {
    const result = Array.from(lists);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    setLists(result);
  };

  // Function to reset the board
  const resetBoard = () => {
    setLists([]);
    localStorage.removeItem('trello-lists');
  };

  return (
    <div className="container">
      <Header resetBoard={resetBoard} />
      <Board 
        lists={lists}
        addList={addList}
        deleteList={deleteList}
        updateListTitle={updateListTitle}
        addCard={addCard}
        updateCard={updateCard}
        deleteCard={deleteCard}
        moveCard={moveCard}
        reorderLists={reorderLists}
      />
    </div>
  );
}
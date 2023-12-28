// App.js

import React, { useState, useEffect } from 'react';
import ColumnHeader from './ColumnHeader';
import CardList from './CardList';

const Home = () => {
  const [phases, setPhases] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch phases from the database
    fetch('https://tasks.vitasoftsolutions.com/tasks')
      .then((response) => response.json())
      .then((data) => setPhases(data.tasks));

    // Fetch cards from the database
    fetch('https://tasks.vitasoftsolutions.com/tasks')
      .then((response) => response.json())
      .then((data) => setCards(data.tasks));
  }, []);

  const markCompletion = (phaseId) => {
    // API call to mark a phase as completion
    fetch(`https://tasks.vitasoftsolutions.com/tasks/${phaseId}/handle_complete`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => console.log('Phase marked as completion:', data));
  };

  const editCard = (cardId, newName, newAssignee, newPhase) => {
    // API call to edit an existing card
    fetch(`https://tasks.vitasoftsolutions.com/tasks/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName, assignee: newAssignee, phase: newPhase }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Card edited:', data));
  };

  const moveCard = (cardId, newPhaseId) => {
    // API call to move a card to a new phase
    fetch(`https://tasks.vitasoftsolutions.com/tasks/${cardId}/${newPhaseId}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((data) => console.log('Card moved to new phase:', data));
  };
  console.log(phases);
  return (
    <div>
      {phases.map((phase) => (
        <div key={phase.id}>
          <ColumnHeader
            title={phase.task}
            cardCount={phases.length}
            markCompletion={() => markCompletion(phase.id)}
          />
          <CardList
            cards={cards}
            editCard={(cardId, newName, newAssignee, newPhase) =>
              editCard(cardId, newName, newAssignee, newPhase)
            }
            moveCard={(cardId, newPhaseId) => moveCard(cardId, newPhaseId)}
          />
        </div>
      ))}
    </div>
  );
};

export default Home;

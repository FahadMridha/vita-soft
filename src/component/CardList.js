import React, { useState } from 'react';

const CardList = ({ cards, editCard, moveCard }) => {
  const [newName, setNewName] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newPhase, setNewPhase] = useState('');

  const handleEditCard = (cardId) => {
    editCard(cardId, newName, newAssignee, newPhase);
    // Reset input fields after editing
    setNewName('');
    setNewAssignee('');
    setNewPhase('');
  };

  const handleMoveCard = (cardId) => {
    moveCard(cardId, newPhase);
    // Reset input fields after moving
    setNewPhase('');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white p-4 rounded-md shadow-md">
          <p className="text-xl font-bold mb-2">{card.task}</p>
          <p className="text-gray-600">Assignee: {card.assignee}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-700"
            onClick={() => handleEditCard(card.id)}
          >
            Edit Card
          </button>
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="New Phase"
              value={newPhase}
              onChange={(e) => setNewPhase(e.target.value)}
              className="border p-2 mr-2 w-2/3"
            />
            <button
              className="bg-green-500 text-white px-1 text-sm py-1 rounded-md hover:bg-green-700"
              onClick={() => handleMoveCard(card.id)}
            >
              Move to New Phase
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;

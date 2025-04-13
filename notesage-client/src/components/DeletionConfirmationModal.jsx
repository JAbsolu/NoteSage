const DeletionConfirmationModal = ({ closeModal, cardId, token, onComplete} ) => {

    const handleDelete =  () => {
      deleteFlashcard(cardId);
      onComplete();
      closeModal();
    };
  
    // delete flashcard
    const deleteFlashcard = async(id) => {
      if (!id) {
        console.log("no card id provided");
        return;
      } 
    
      const headers = {
        "Content-Type": "application/json",
        "Authorization": token
      }
    
      try {
        const response = await fetch(`http://localhost/delete-card?id=${id}`, {
          method: "DELETE",
          headers: headers
        })
    
        const result = await response.json();
    
        if (!response.ok) {
          console.log("Status:", response.status, result.message);
          return;
        }
    
        console.log("Status:", response.status, result.message);
      } catch(err) {
    
      }
    }
  
    return (
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this flashcard? </h2>
          <div className="flex justify-end space-x-2 mt-4">
            <button onClick={closeModal} className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button 
              onClick={handleDelete} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-400 hover:text-gray-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

export default DeletionConfirmationModal;
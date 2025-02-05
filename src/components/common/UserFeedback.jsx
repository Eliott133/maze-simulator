import React, { useState } from 'react';

const UserFeedback = ({ lvl_error, message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold text-red-600">{lvl_error}</h2>
        <p className="text-sm text-gray-700 mt-2">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;

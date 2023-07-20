import React, { useState } from "react";
import "../styles/CommentForm.css";

const CommentForm = ({ handleAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleCommentSubmit = () => {
    if (commentText.trim() !== "") {
      handleAddComment(commentText);
      setCommentText("");
    }
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleKeyPress = (e) => {
    // Check if the "Enter" key is pressed
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  return (
    <div className="comment-form">
      <h3 className="form-heading">Add a Comment</h3>
      <div className="form-content">
        <textarea
          value={commentText}
          onChange={handleCommentChange}
          onKeyPress={handleKeyPress} // Add the event listener for "Enter" key press
          placeholder="Write your comment here..."
        />
        <button className="submit-btn" onClick={handleCommentSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
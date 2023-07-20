import React, { useState, useRef, useEffect } from "react";
import "../styles/Comment.css";

const Comment = ({ comment, handleAddComment, handleDeleteComment, level, parentId, handleEditComment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const inputRef = useRef(null); // Create a reference to the input element

  const handleReplyToggle = () => {
    setShowReplyForm(!showReplyForm);
    setReplyText("");
  };

  const handleReplySubmit = () => {
    handleAddComment(replyText, comment.id, level);
    handleReplyToggle();
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);
  };

  const handleEdit = () => {
    setEditing(true);
    setEditText(comment.text);
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  const handleEditSubmit = () => {
    handleEditCancel();
    handleEditComment(comment.id,editText);
    // Call your edit function here
  };

  useEffect(() => {
    if (showReplyForm || editing) {
      // When showReplyForm or editing is true, focus on the input field
      inputRef.current.focus();
    }
  }, [showReplyForm, editing]);

  return (
    <div className="comment-container">
      <div className="comment">
        {!editing ? (
          <>
            <p className="comment-text">{comment.text}</p>
            <p className="timestamp">Posted on: {comment.timestamp}</p>
            <button className="delete-btn" onClick={() => handleDeleteComment(comment.id, parentId)}>
              Delete
            </button>
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
            {showReplyForm ? (
              <div className="reply-form">
                <input
                  ref={inputRef} // Set the input element's reference
                  type="text"
                  placeholder="Your reply..."
                  value={replyText}
                  onChange={handleReplyChange}
                />
                <button className="submit-btn" onClick={handleReplySubmit}>
                  Reply
                </button>
                <button className="cancel-btn" onClick={handleReplyToggle}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="reply-btn" onClick={handleReplyToggle}>
                Reply
              </button>
            )}
          </>
        ) : (
          <>
            <textarea
              ref={inputRef} // Set the input element's reference
              className="edit-textarea"
              value={editText}
              onChange={handleEditChange}
            />
            <button className="submit-btn" onClick={handleEditSubmit}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleEditCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
      <div className="replies">
        {comment.replies.map((reply) => (
          <Comment
            key={reply.id}
            comment={reply}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            level={level + 1}
            parentId={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Comment;
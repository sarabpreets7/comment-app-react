import React, { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import '../styles/CommentWidget.css';

const CommentWidget = () => {
  const [comments, setComments] = useState([]);

  function addComment(text, parentCommentId , comment){

    if(comment.id == parentCommentId){

      let newComment = {
      id: Date.now(),
      text: text,
      parentCommentId: parentCommentId,
     
      replies: [],
      timestamp: new Date().toLocaleString(),
    };

    comment.replies = [...comment.replies,newComment];

    return true;
    }

    if(comment.replies.length == 0){
      return false;
    }


    comment.replies.map((item)=>{
      let res = addComment(text,parentCommentId,item);
      if(res){
        return true;
      }
    })

    return false;

  }

  function editComment(text, commentId , comment){

    if(comment.id == commentId){

    comment.text = text;

    return true;
    }

    if(comment.replies.length == 0){
      return false;
    }


    comment.replies.map((item)=>{
      let res = editComment(text,commentId,item);
      if(res){
        return res;
      }
    })

    return false;

  }

  

  function deleteComment( commentId,parentCommentId,comment){

    if(comment.id == parentCommentId){
 
     comment.replies = comment.replies.filter((rply)=>{return rply.id != commentId});
 
     return true;
    }
 
  
    if(comment.replies.length == 0){
     return false;
    }
 
    for(let i=0;i<comment.replies.length;i++){
     let res = deleteComment(commentId,parentCommentId,comment.replies[i]);
     if(res){
       return res;
     }
    }
 
    return false;
 
     }

  

  const handleAddComment = (text, parentCommentId = null,lvl= null) => {
   
    const newComment = {
      id: Date.now(),
      text: text,
      parentCommentId: parentCommentId,
      level: !parentCommentId?0:lvl,
      replies: [],
      timestamp: new Date().toLocaleString(),
    };

    if (parentCommentId) {
        let isFound = false;
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentCommentId) {
            isFound = true;
          return {
            ...comment,
            replies: [...comment.replies, newComment],
          };
        }


        return comment;
      });
      if(!isFound){
        
        for(let i=0;i<comments.length;i++){
          let result = addComment(text,parentCommentId,comments[i]);
          if(result){
            break;
          }
        
        }
      }
      setComments(updatedComments);
    } else {
      setComments([...comments, newComment]);
    }
  };

  const handleDeleteComment = (commentId,parentCommentId) => {

    if(!parentCommentId || parentCommentId == 'undefined'){
      let newComments = comments.filter((item)=>{
        return item.id != commentId
      });
      
      setComments([...newComments])
    }
    else{
      for(let i=0;i<comments.length;i++){
        let res = deleteComment(commentId,parentCommentId,comments[i]);
        if(res){
          break;
        }
      } 
      setComments([...comments])
    }
   
    
    
  }

  const handleEditComment =(commentId,text)=>{
    for(let i=0;i<comments.length;i++){
      let res = editComment(text,commentId,comments[i]);
      if(res){
        break;
      }
    }
  }

  return (
    <div className="comment-widget">
    <h2 className="widget-heading">Comments</h2>
    <div className="comment-section">
      <CommentForm handleAddComment={handleAddComment} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
          handleEditComment={handleEditComment}
          level={0}
        />
      ))}
    </div>
  </div>
  );
};

export default CommentWidget;
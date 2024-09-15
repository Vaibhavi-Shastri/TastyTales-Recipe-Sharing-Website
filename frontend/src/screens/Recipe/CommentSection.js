import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { List, Button, Input, Popconfirm, notification } from 'antd';
import { DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const CommentSection = ({ recipeId, currentUserId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingCommentText, setEditingCommentText] = useState('');
    const [cookies] = useCookies(['access_token']);

    useEffect(() => {
      const fetchComments = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/comments`);
          // Ensure response data is an array of comments
          if (Array.isArray(response.data)) {
            setComments(response.data);
          } else {
            console.error('Unexpected response format', response.data);
          }
        } catch (err) {
          console.error('Failed to fetch comments', err);
        }
      };

      fetchComments();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/recipes/${recipeId}/comments`,
          { userid: currentUserId, comment: newComment },
          { headers: { authorization: cookies.access_token } }
        );

        setComments(response.data);
        setNewComment('');
      } catch (err) {
        console.error('Failed to add comment', err);
      }
    }
  };

 

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/recipes/${recipeId}/comments/${commentId}`,
        { headers: { authorization: cookies.access_token } }
      );
      setComments(comments.filter(comment => comment._id !== commentId));
      notification.success({
        message: 'Comment deleted successfully',
      });
    } catch (err) {
      console.error('Failed to delete comment', err);
    }
  };

  const handleEditComment = async (commentId) => {
    if (editingCommentText.trim()) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/recipes/${recipeId}/comments/${commentId}`,
          { comment: editingCommentText },
          { headers: { authorization: cookies.access_token } }
        );
        console.log("response is ::",response.data);
        setComments(
          comments.map(comment =>
            comment._id === commentId ? response.data : comment
          )
        );
        setEditingCommentId(null);
        setEditingCommentText('');
        notification.success({
          message: 'Comment edited successfully',
        });
      } catch (err) {
        console.error('Failed to edit comment', err);
      }
    }
  };

  return (
    <div>
      <h3>Comments</h3>

      <List
        itemLayout="horizontal"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item
            actions={[
              comment.userid._id === currentUserId && (
                <>
                  <Popconfirm
                    title="Are you sure to delete this comment?"
                    onConfirm={() => handleDeleteComment(comment._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      danger
                    />
                  </Popconfirm>
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditingCommentId(comment._id);
                      setEditingCommentText(comment.comment);
                    }}
                  />
                </>
              ),
            ]}
          >
            {editingCommentId === comment._id ? (
              <Input
                value={editingCommentText}
                onChange={(e) => setEditingCommentText(e.target.value)}
                onPressEnter={() => handleEditComment(comment._id)}
                suffix={
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleEditComment(comment._id)}
                  />
                }
              />
            ) : (
              <List.Item.Meta
                title={comment.userid.username}  // Access nested username
                description={comment.comment}
              />
            )}
          </List.Item>
        )}
      />
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment"
        onPressEnter={handleAddComment}
        suffix={
          <Button type="primary" onClick={handleAddComment}>
            Comment
          </Button>
        }
      />
    </div>
  );
};

export default CommentSection;


import api from '../../axios';

export const createComment = async (commentData) => {
  const response = await api.post(`/comments/${commentData.postId}/comments`, {
    text: commentData.commentText,
  });
  return response.data;
};

export const getCommentsForPost = async (postId) => {
  const response = await api.get(`/comments/${postId}/comments`);
  
  return response.data.comments || [];
};

export const deleteComment = async (postId, commentId) => {
 
  const response = await api.delete(`/comments/\({postId}/comments/\){commentId}`);
  return response.data;
};
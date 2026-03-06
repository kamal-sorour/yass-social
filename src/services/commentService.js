import api from './api';

export const getPostComments = async ({ postId, page = 1, limit = 10 }) => {
    const response = await api.get(`/posts/${postId}/comments?page=${page}&limit=${limit}`);
    return response.data;
};

export const getCommentReplies = async ({ postId, commentId, page = 1, limit = 10 }) => {
    const response = await api.get(`/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=${limit}`);
    return response.data;
};

export const createComment = async ({ postId, formData }) => {
    const response = await api.post(`/posts/${postId}/comments`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deleteComment = async ({ postId, commentId }) => {
    const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
    return response.data;
};

export const updateComment = async ({ postId, commentId, formData }) => {
    const response = await api.put(`/posts/${postId}/comments/${commentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const toggleLikeComment = async ({ postId, commentId }) => {
    const response = await api.put(`/posts/${postId}/comments/${commentId}/like`);
    return response.data;
};

export const createReply = async ({ postId, commentId, formData }) => {
    const response = await api.post(`/posts/${postId}/comments/${commentId}/replies`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
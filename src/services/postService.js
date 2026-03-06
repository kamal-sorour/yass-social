import api from './api'; 

export const getAllPosts = async (page = 1, limit = 40) => {
    const response = await api.get(`/posts?page=${page}&limit=${limit}`);
    return response.data;
};

export const getSinglePost = async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
};

export const getHomeFeed = async (page = 1, limit = 10) => {
    const response = await api.get(`/posts/feed?only=following&limit=${limit}&page=${page}`);
    return response.data;
  };

export const getPostLikes = async (postId, page = 1, limit = 20) => {
    const response = await api.get(`/posts/${postId}/likes?page=${page}&limit=${limit}`);
    return response.data;
};

export const createPost = async (postData) => {
    const response = await api.post('/posts', postData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const deletePost = async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};

export const updatePost = async ({ postId, formData }) => {
    const response = await api.put(`/posts/${postId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const toggleLikePost = async (postId) => {
    const response = await api.put(`/posts/${postId}/like`);
    return response.data;
};

export const toggleBookmarkPost = async (postId) => {
    const response = await api.put(`/posts/${postId}/bookmark`);
    return response.data;
};

export const sharePost = async ({ postId, body }) => {
    const response = await api.post(`/posts/${postId}/share`, { body });
    return response.data;
  };
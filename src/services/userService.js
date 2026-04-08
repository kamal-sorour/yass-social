import api from './api';

export const getMyProfile = async () => {
  const response = await api.get('/users/profile-data');
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}/profile`);
  return response.data;
};

export const getUserPosts = async (userId) => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};

export const toggleFollowUser = async (userId) => {
  const response = await api.put(`/users/${userId}/follow`);
  return response.data;
};

export const uploadProfilePhoto = async (formData) => {
  const response = await api.put('/users/upload-photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadProfileCover = async (formData) => {
  const response = await api.put('/users/upload-cover'), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getBookmarks = async () => {
  const response = await api.get('/users/bookmarks');
  return response.data;
};

export const changePassword = async (passwords) => {
  const response = await api.patch('/users/change-password', passwords);
  return response.data;
};

export const getSuggestions = async (limit = 10) => {
  const response = await api.get(`/users/suggestions?limit=${limit}`);
  return response.data;
};

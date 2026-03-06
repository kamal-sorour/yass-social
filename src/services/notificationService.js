import api from './api';

export const getNotifications = async (page = 1, limit = 10) => {
  const response = await api.get(`/notifications?page=${page}&limit=${limit}`);
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await api.get('/notifications/unread-count');
  return response.data;
};

export const markAsRead = async (notificationId) => {
  const response = await api.patch(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await api.patch('/notifications/read-all');
  return response.data;
};
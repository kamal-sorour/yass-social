import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../services/notificationService";
import toast from "react-hot-toast";

export const useNotificationsList = (page = 1) => {
  return useQuery({
    queryKey: ["notifications", page],
    queryFn: () => getNotifications(page),
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ["unreadCount"],
    queryFn: getUnreadCount,
    refetchInterval: 30000,
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadCount"] });
    },
    onError: () => toast.error("Failed to mark all as read"),
  });
};
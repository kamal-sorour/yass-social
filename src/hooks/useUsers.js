import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  getUserProfile,
  getUserPosts,
  toggleFollowUser,
  uploadProfilePhoto,
  uploadProfileCover,
  getBookmarks,
  changePassword,
  getSuggestions,
} from "../services/userService";
import toast from "react-hot-toast";

export const useMyProfile = (options = {}) => {
  return useQuery({
    queryKey: ["myProfile"],
    queryFn: getMyProfile,
    ...options,
  });
};

export const useUserProfile = (userId, options = {}) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    ...options,
  });
};

export const useUserPosts = (userId, options = {}) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getUserPosts(userId),
    ...options,
  });
};

export const useToggleFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleFollowUser,
    onSuccess: (data, userId) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: () => toast.error("Failed to update follow status"),
  });
};

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfilePhoto,
    onSuccess: () => {
      toast.success("Profile photo updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: () => toast.error("Failed to upload photo"),
  });
};  

export const useUploadCover = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadProfileCover,
    onSuccess: () => {
      toast.success("Profile cover updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
    },
    onError: () => toast.error("Failed to upload cover"),
  });
};

export const useBookmarks = () => {
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: getBookmarks,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const useSuggestions = (limit = 10) => {
  return useQuery({
    queryKey: ["suggestions", limit],
    queryFn: () => getSuggestions(limit),
  });
};

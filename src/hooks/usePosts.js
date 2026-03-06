import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleLikePost,
  toggleBookmarkPost,
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
  getHomeFeed,
  sharePost,
  getPostLikes,
} from "../services/postService";
import { toast } from "react-hot-toast";
export const usePosts = (page = 1) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: () => getAllPosts(page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSinglePost = (postId) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getSinglePost(postId),
    enabled: !!postId,
  });
};

export const useHomeFeed = (page = 1) => {
  return useQuery({
    queryKey: ["posts", "feed", page],
    queryFn: () => getHomeFeed(page),
  });
};

export const usePostLikes = (postId) => {
  return useQuery({
    queryKey: ["postLikes", postId],
    queryFn: () => getPostLikes(postId),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useToggleLike = () => {
  return useMutation({
    mutationFn: toggleLikePost,
  });
};

export const useToggleBookmark = () => {
  return useMutation({
    mutationFn: toggleBookmarkPost,
  });
};

export const useSharePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sharePost,
    onSuccess: () => {
      toast.success("Post shared successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => toast.error("Failed to share post"),
  });
};
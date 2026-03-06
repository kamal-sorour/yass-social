import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPostComments,
  createComment,
  deleteComment,
  updateComment,
  getCommentReplies,
  toggleLikeComment,
  createReply,
} from "../services/commentService";
import toast from "react-hot-toast";

export const usePostComments = (postId, page = 1) => {
  return useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () => getPostComments({ postId, page }),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createComment,
    onSuccess: (response, variables) => {
      toast.success("Comment added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to add comment"),
  });
};

export const useCreateReply = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createReply,
    onSuccess: (response, variables) => {
      toast.success("Reply added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["replies", variables.commentId],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to add reply"),
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (response, variables) => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.postId] });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to delete comment"),
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (response, variables) => {
      toast.success("Comment updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });
    },
    onError: (error) =>
      toast.error(error?.response?.data?.message || "Failed to update comment"),
  });
};

export const useCommentReplies = (postId, commentId) => {
  return useQuery({
    queryKey: ["replies", commentId],
    queryFn: () => getCommentReplies({ postId, commentId }),
    enabled: !!commentId,
  });
};

export const useToggleLikeComment = () => {
  return useMutation({ mutationFn: toggleLikeComment });
};
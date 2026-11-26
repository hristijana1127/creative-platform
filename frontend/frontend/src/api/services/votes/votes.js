import api from '../../axios';

export const getVoteInfo = async (contestId, postId) => {
    const response = await api.get(
        `/contest-votes/${contestId}/posts/${postId}/votes`
    );

    return response.data;
};

export const VoteForPost = async (contestId, postId) => {
    const response = await api.post(
        `/contest-votes/${contestId}/${postId}/votes`
    );

    return response.data;
};

export const removeVote = async (contestId, postId) => {
    const response = await api.delete(
        `/contest-votes/${contestId}/posts/${postId}/vote`
    );

    return response.data;
};
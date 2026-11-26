import api from '../../axios'

export const createPost = async (postData) =>{
    const formData = new FormData();

    formData.append('file', postData.file);
    formData.append('title',postData.title);
    formData.append('format', postData.format);

    if(postData.description){
        formData.append('description',postData.description);
    }
    if(postData.parentPostId){
        formData.append('parentPostId',postData.parentPostId);
    }
    if(postData.contestId){
        formData.append('contestId',postData.contestId);
    }

    const response = await api.post('/posts', formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getPosts = async() =>{
    const response = await api.get('/posts');
    return response.data;
};

export const getUserPosts = async(token,userId) => {
    try{
    const response = await api.get(`/posts/user/${userId}`,
        {headers:{
          Authorization:`Bearer ${token}`,
        }}
    );
    return response.data;
    }catch(error){
        throw error;
    }

};
export const deletePost = async(postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
};
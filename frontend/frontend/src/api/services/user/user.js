import api from '../../axios'

export const getUser = async(userId, token)=>{
    console.log("getUser called with ID:", userId);
    try{const response = await api.get(`/users/${userId}`,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
    console.log(response);
    return response.data;
}catch(error){
    throw error;
}
};


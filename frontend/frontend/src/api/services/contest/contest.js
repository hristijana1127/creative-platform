import api from '../../axios'

export const createContest = async (contestData) => {
    const response = await api.post("/contests", {
        title: contestData.title,
        theme: contestData.theme,
        description: contestData.description,
        startDate: contestData.startDate,
        endDate: contestData.endDate
    });

    return response.data;
};

export const getContests = async() => {
    try{
     const response = await api.get('/contests');
     return response.data;
    }
     catch(error){
        throw error;
     }
};
export const getSubmissions = async(contestId) => {
    try{
        const response = await api.get(`/contests/${contestId}/submissions`)
        return response.data; 
 }catch(error){
    throw error;
 }
};

export const getContestById = async(contestId) =>{
    const response = await api.get(`/contests/${contestId}`);
    return response.data;
};



export const submitToContest = async (contestId, postId) => {
    try{
  const response = await api.post(
    `/contests/${contestId}/submissions`,
    { postId }
  );
    
  return response.data;
}catch(error){
    console.log("SUBMIT ERROR: ", error.response?.data );
    throw error;
}
};



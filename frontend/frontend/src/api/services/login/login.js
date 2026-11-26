import api from "../../axios"

export const loginUser = async(credentials) =>{
    console.log(credentials);
    console.log("Login Payload:", JSON.stringify(credentials, null,2));
    try{
        const response = await api.post("/auth/login", credentials, {
            headers:{
                "Content-Type": "application/json",
            }
        });
        return response.data;
    }
    catch(error){
        console.log("Login API error: ",error.response?.data);
        console.log("Status:",error.response?.status);

        throw error;
    }
};
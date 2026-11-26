import api from "../../axios"

export const registerUser = async(registerData) => {
   
     const response = await api.post('/auth/register', {
        name: registerData.name,
        email: registerData.email,
        username: registerData.username,
        password: registerData.password,
     });
    return response.data;
};
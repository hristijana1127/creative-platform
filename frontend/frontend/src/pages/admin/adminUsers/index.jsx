import {useEffect, useState} from 'react';
import{Box, Card, CardContent,CircularProgress, Typography,} from '@mui/material';

import AdminLayout from "../../../components/AdminLayout";
import API from '../../../api/axios';

const AdminUsers = () =>{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("Users!")
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const response = await API.get("admin/users");
                setUsers(response.data);
                console.log(response.data);
            }catch(error){
                console.error("Error fetching users", error);
            }finally{
                setLoading(false);
            }
        };
        fetchUsers();
    },[]);
    if(loading){
        return(
                <CircularProgress/>
        );
    };
    return(
        <Box>
            <Typography variant='h4' sx={{mb: 4}}>
                Users
            </Typography>

            <Box 
            sx={{
                display:"flex",
                flexDirection:"column",
                gap:2,
            }}>
                {users.map((user) =>(
                    <Card key={user._id}>
                        <CardContent>
                            <Typography variant="h6">
                                {user.usename}
                            </Typography>

                            <Typography color="text.secondary">
                                {user.email}
                            </Typography>

                            <Typography sx={{mt:1}}>
                                Role:{user.role}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    )
};
export default AdminUsers;
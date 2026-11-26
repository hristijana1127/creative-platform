import {useState, useEffect} from 'react';
import SearchBar from '../ui/SearchBar';
import {List,ListItem, ListItemText,Typography, Avatar,Tabs,Tab} from '@mui/material';
import { searchContent } from '../../api/services/search/search';


export const index = () => {
    const [query, setQuery]= useState('');
    const[posts,setPosts] =useState([]);
    const [users, setUsers] = useState([]);
    const[tab, setTab] = useState(0);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (!query.trim()) {
                setPosts([]);
                setUsers([]);
                return;
            }
            try{
                const data = await searchContent(query);
                setPosts(data.posts);
                setUsers(data.users);
            }
            catch(err){
                console.error('Search failed',err);
            }
        
        },[query])
  return (
    <div>index</div>
  )
}

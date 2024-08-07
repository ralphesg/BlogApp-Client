import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import UserView from '../components/UserView';



export default function MoviesCatalog() {

    const [blogs, setBlogs] = useState([]);
    const [userId, setUserId] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

 useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded.isAdmin);
        setUserId(decoded?.id);
        if (decoded.isAdmin === true){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAdmin(false);
      }
    }
  }, []);

    const fetchData = () => {
        let fetchUrl = `${import.meta.env.VITE_API_URL}/blogs/getBlogs`

        fetch(fetchUrl, {
            
        })
        .then(res => res.json())
        .then(data => {         
            console.log(data)
            if(data.message === "No blog found"){
                setBlogs([])
            } else {
                setBlogs(data.blogs);
            }
        });
    }

   useEffect(() => {

        fetchData();

    }, []);

    return(
     
            <UserView blogsData={blogs} fetchData={fetchData} isAdmin={isAdmin} userId={userId}/>
            
    )
}
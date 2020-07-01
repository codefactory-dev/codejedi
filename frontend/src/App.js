import React, { useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const [user,setUser] = useState(null)
  useEffect(()=>{
    async function getUser()
    {
      const fetchedUser = await axios.get('/user')
      console.log("user fetched. setting")
      setUser(fetchedUser.data);
    }
    getUser();
  },[])
  return (
    <div>
      Welcome, {user}
    </div>
  );
}

export default App;

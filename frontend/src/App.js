import React, { useState, useEffect } from 'react';
import axios from 'axios'
import GenerateName from './GenerateName.js'

function App() {

  const [users,setUsers] = useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    async function getUsers()
    {
      const response = await fetch('/.netlify/functions/server/api/hello');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(body)
      /*const fetchedUsers = await axios.get('/.netlify/functions/server/api/hello')
      setUsers(fetchedUsers.data.map((fetchedUserData)=>{
        return `${fetchedUserData.firstname} ${fetchedUserData.lastname}`;
      }));
      */
    }
    getUsers();
  },[])
  function generateRandomUser()
  {
    async function generateAsync() {
      const newName = GenerateName();
      setLoading(true);
      const result = await axios.post('/users', {name: newName});
      console.log("posted user: "+result.data.name);
      setUsers([...users,`${result.data.firstname} ${result.data.lastname}`]);
      setLoading(false);
    }
    generateAsync();
  }
  return (
    <div>
      Welcome. These are all the users: 
      <ul>
        {
          users 
          ?
          users.map((user, index) =>{ 
            console.log(user) 
            return(
              <li key={index}>{user}</li>
            )
          })
          :
          <span>no users found</span>
        }
      </ul>
      <div>
        <label>
          Click to generate a new user with a random name:
        <button onClick={generateRandomUser}>
          { loading ? '...' : 'Generate' }
        </button>
        </label>
      </div>
    </div>
  );
}

export default App;

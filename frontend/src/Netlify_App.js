import React, { useState, useEffect } from 'react';
import api from 'services/api'
import GenerateName from './GenerateName.js'
import TextFileReader from './utils/TextfileReader.js'


var myTxt = require("./version.txt");

function App() {

  const [users,setUsers] = useState(null)
  const [loading,setLoading] = useState(false)
  
  useEffect(()=>{
    async function getUsers()
    {
      const fetchedUsers = await axios.get('/.netlify/functions/server/api/users')
      setUsers(fetchedUsers.data.map((fetchedUserData)=>{
        return `${fetchedUserData.firstname} ${fetchedUserData.lastname}`;
      }));
    }
    getUsers();
  },[])
  function generateRandomUser()
  {
    async function generateAsync() {
      const newName = GenerateName();
      setLoading(true);
      const result = await api.post('/.netlify/functions/server/api/users', {name: newName});
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
          Click the button to generate a new user with a random name:
        <button onClick={generateRandomUser}>
          { loading ? '...' : 'Generate' }
        </button>
        </label>
      </div>
      <footer>
        version: <TextFileReader txt={myTxt} />
      </footer>
    </div>
  );
}

export default App;

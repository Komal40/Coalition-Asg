import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import './Login.css'
import { DataProvider } from "../../DataContext";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const {setUserData}=useContext(DataProvider)

const navigate=useNavigate()
  
    const fetchData = async () => {
  
      if(!username || !password){
          alert('Enter Details')
          return
      }
      
      try {
        const link = "https://fedskillstest.coalitiontechnologies.workers.dev/";
        // Replace 'username' and 'password' with actual credentials
  
        let auth = btoa(`${username}:${password}`);
  
        const res = await axios.get(link, {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        });

        if(res.status==200){
            console.log(res)
            navigate('/data', {state:res.data})
            sessionStorage.setItem('user', JSON.stringify(res.data))
            setUserData(res.data)
        }
      } catch (error) {
        console.error(error);
        alert(error?.response?.data?.error_message)
      }
    };
    return (
      <div className="login_main">
      <div className="container">
      <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
  
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        {/* Fetch Button */}
        <button onClick={fetchData}>Fetch Data</button>
      </div>
      </div>
    );
}

export default Login

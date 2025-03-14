import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import envVars from '../../../config/config.js'


export default function StudentComponentPage(props){
  const [input , setInput] = useState("");
  const [results , setResults] = useState([]);
  const [loading , setLoading] = useState(false);
  const handleSearch = async()=>{
    console.log("in handle search");
    if(!input.trim()) return;
    setLoading(true);
    try {
      // using fetch
      // const response = await fetch(`${envVars.VITE_BASE_URL}student/filter?name=${input}`);
      // const data = response.json();
      // console.log(data);
      // setResults(data);
      //using axios
      axios.get(`${envVars.VITE_BASE_URL}student/filter?name=${input}`)
      .then((response)=>{
        setResults(response.data)
      }
      );

    } catch (error) {
      console.error(`Error fetching the results ${error.message}`) ;
    }
    setLoading(false);
  }

  return <div className="flex felx-col items-center p-6">
    {/* input div */}
    <div className="w-full max-w-2xl">
      <input 
        type="text" 
        placeholder="Search name , id , number , branch"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        onKeyDown={(e)=>e.key=="Enter" && handleSearch()}
      />
      <button 
        className="w-full mt-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleSearch}
      >Search
      </button>
    </div>

    {/* output div */}
    {loading && <h1>Loading bro please wait</h1> }

    <div className="w-full max-w-2xl mt-6">
      {results.length===0 && !loading && input && <h1>No results found</h1> }

      {results.map((user)=>(
        <div 
        key={user.id}
        className="flex items-center p-4 mb-4 bg-white shadow-md rounded-lg"
        >
          <img src={user.image} alt={user.name}
            className="w-16 h-16 rounded-full border"
          />
          <div className="ml-4 flext-1">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500">ID : {user.sid}</p>
            <p className="text-grey-500">Phone : {user.phone} | CGPA : {user.cgpa} </p>
          </div>
        </div>
      ))}
    </div>


    
  </div>
}
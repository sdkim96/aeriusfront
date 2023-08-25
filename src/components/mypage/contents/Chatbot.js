import { useState } from "react";
import './usercases.css'
import './chatbot.css'

const Chatbot = () => {
    const [query,setQuery] = useState("");
    const [response, setResponse] = useState("");


    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleChatbotQuerySubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try{
            const response = await fetch("http://localhost:5000/chatbot/", {
                method: 'POST',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({query})
            });

            const data = await response.json();
            setResponse(data);
            console.log(data)
        }
        catch (error) {

        }
    }
    
    return(
        <div className="chatbot">
            <h1>챗봇</h1>
            <div className="answers">
                <p>{JSON.stringify(response)}</p>

                
            </div>
            <form name='chatbot-form' onSubmit={handleChatbotQuerySubmit}>
                <input type="text" name="user-id" value={query} onChange={handleInputChange} />

                <button type="submit">send</button>
            </form>
            
        </div>
    )
}

export default Chatbot
import { useState } from "react";
import './usercases.css'
import './chatbot.css'

const Chatbot = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [oldResponses, setOldResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // Loading state

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleChatbotQuerySubmit = async (e) => {
        setQuery("");  // Clear the input field
        e.preventDefault();
        setIsLoading(true); // Start loading

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
            setOldResponses([...oldResponses, { query, response: data.response }]);
            setResponse(data);

            console.log(data)
        }
        catch (error) {

        }
        finally {
            setIsLoading(false); // Stop loading
        }
    }
    
    return(
        <div className="chatbot">
            <h1>챗봇</h1>
            <div className="answers">
                <div className="old-answers">
                    {oldResponses.map((oldResponse, index) => (
                        <div key={index}>
                            <p><strong>질문 :</strong> {oldResponse.query}</p>
                            <p><strong>답변 :</strong> {oldResponse.response}</p>
                        </div>
                    ))}
                </div>
                {isLoading && <div>Loading...</div>} {/* Loading spinner */}
            </div>
            <br></br>
            <form name='chatbot-form' onSubmit={handleChatbotQuerySubmit}>
                <input type="text" name="user-id" value={query} onChange={handleInputChange} />
                <button type="submit">send</button>
            </form>
            
        </div>
    )
}

export default Chatbot

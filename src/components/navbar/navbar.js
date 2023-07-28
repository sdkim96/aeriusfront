import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './navbar.css'


const NavBar = ({isLoggedIn, setIsLoggedIn}) =>{

    const [word, setWord] = useState('Im singulare. Non sum normalem');
    const [fade, setFade] = useState(false);
    const [isKorean, setIsKorean] = useState(false);  // 새로운 상태 추가

    const words = (latin, korean, mouseover) => {
        if (mouseover) {
            setFade(true);
            setTimeout(() => {
                setWord(korean);
                setFade(false);
                setIsKorean(true);  // 한국어 문장 출력 시 상태 업데이트
            }, 500);
        } else {
            setFade(true);
            setTimeout(() => {
                setWord(latin);
                setFade(false);
                setIsKorean(false);  // 라틴어 문장 출력 시 상태 업데이트
            }, 500);
        }
    }

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
    
        // Now, send a logout request to the server
        try {
            const response = await fetch('http://localhost:8000/myapp/logout/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
                    'Content-Type': 'application/json'
                }
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Logout successful:', data);
            } else {
                console.error('Logout error:', data);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
        
        // Remove the token from local storage
        setIsLoggedIn(false); 
        localStorage.removeItem('token');
    }

    const handleStaff = async () => {

    }
    

    return(
        <nav>
            <p 
                className={`words ${fade ? 'fade' : ''} ${isKorean ? 'korean' : ''}`}
                onMouseOver={() => words('Im singulare. Non sum normalem', '나는 특별하다. 나는 평범하지 않다.', true)}
                onMouseOut={() => words('Im singulare. Non sum normalem', '나는 특별하다. 나는 평범하지 않다.', false)}
            >
                {word}
            </p>
            <p className='logo'><a href='/'>Veiyd</a></p>
            <ul>
                <li><NavLink to="/about">about us</NavLink></li>
                <li><NavLink to="/store">store</NavLink></li>
                <li><NavLink to="/help">help</NavLink></li>
                {
                    isLoggedIn
                    ? <>
                        <li><NavLink to="/mypage">mypage</NavLink></li>
                        <li><a href="/" onClick={handleLogout}>logout</a></li>
                      </>  
                    : <li><NavLink to="/login">login</NavLink></li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;

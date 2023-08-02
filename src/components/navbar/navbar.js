import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './navbar.css'


const NavBar = ({isLoggedIn, setIsLoggedIn, isStaff, setIsStaff}) =>{
    useEffect(() => {
        console.log("IsStaff updated: ", isStaff);
    }, [isStaff]); 
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
        setIsStaff(false); // Add this line
        localStorage.removeItem('token');
        localStorage.removeItem('level');
    }

    // authorize url로 접속하려는 사이트 정보, 인증 토큰 보내야됨
    const handleStaff = async () => {
        const token = localStorage.getItem('token');
        const url = 'to_admin_url'

        console.log(token)
        

        try{
            const response = await fetch('http://localhost:8000/myapp/authorize/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({ 'work': url })  // body에 JSON 형태로 데이터를 전달합니다.
            });
            
            if (!response.ok) {
                throw new Error('당신의 인증토큰이 만료되었습니다.');
            }
        
            const data = await response.json();
    
            if (data.result) {
                setIsStaff(true);
                window.location.href = 'http://localhost:3000/admin/';
            } else {
                setIsStaff(false);
                window.location.href = 'http://localhost:3000/noauthorize/';
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleMypage = async () =>{
        const token = localStorage.getItem('token');
        const url = 'to_mypage_url'

        
        try{
            const response = await fetch('http://localhost:8000/myapp/authorize/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'work': url})
            });

            const data = await response.json();

            if (data.result) {
                setIsStaff(false);
                window.location.href = 'http://localhost:3000/mypage/';
            } else {
                setIsStaff(false);
                window.location.href = 'http://localhost:3000/noauthorize/';
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                        { isStaff 
                            ? <li><a href="#" onClick={handleStaff}>admin</a></li>
                            : <li><a href="#" onClick={handleMypage}>mypage</a></li> 
                        }
                        <li><a href="/" onClick={handleLogout}>logout</a></li>
                    </>
                    : <li><NavLink to="/login">login</NavLink></li>
                }
            </ul>
        </nav>
    )
}

export default NavBar;

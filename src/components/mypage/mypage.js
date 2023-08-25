import './mypage.css';
import { useState, useEffect } from 'react';
import Info from './contents/Info.js';
import Cart from './contents/Cart.js';
import Recommend from './contents/Recommend.js';
import Chatbot from './contents/Chatbot.js';
import { authorize } from '../backpages/authorize';
import axios from 'axios';

const MyPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('');
    const [authorized, setAuthorized] = useState(false); // 인증 상태를 저장할 state 추가
    const [loading, setLoading] = useState(true); 
    const [userData, setUserData] = useState(null); // user_info로 넘어갈 정보임


    useEffect(() => {
        const checkAuthorization = async () => {
            const url = `to_mypage_url`; // 실제 사용하시는 API 경로로 변경하세요
            const isAuthorized = await authorize(url);
            setAuthorized(isAuthorized);
            setLoading(false);
        };
        checkAuthorization();
    }, []); // 빈 dependency array를 넘겨주면 컴포넌트가 처음 마운트 될 때만 인증 체크


    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
    
            try {
                const response = await fetch('http://localhost:8000/user/whoareyou/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
                        'Content-Type': 'application/json'
                    },
                });
    
                if (!response.ok) {
                    throw new Error('당신의 인증토큰이 만료되었습니다.');
                }
    
                const userData = await response.json();
                console.log(userData);
                setUserData(userData);
                return userData;

            } catch (error) {
                console.error('An error occurred:', error);
                return false;
            }
        };
    
        fetchUserData();  // 비동기 함수 호출
    
    }, []);
    


    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    }

    const renderSelectedMenu = () => {
        switch (selectedMenu) {
            case 'user-info':
                return <Info userData={userData} />;
            case 'user-cart':
                return <Cart/>;
            case 'user-recommend':
                return <Recommend/>;
            case 'user-chatbot':
                return <Chatbot/>;   
            default:
                return <Info/>;
        }
    }

    if (loading) { // 로딩 중일 때
        return <div>인증 상태를 확인하는 중입니다...</div>; // 로딩 메시지를 보여주거나 다른 로딩 컴포넌트를 렌더링할 수 있습니다.
    }

    if (!authorized) { // 인증이 안 된 경우
        window.location.href = 'http://localhost:3000/noauthorize/';
    }

    return (
        <div className='my-page'>
            <div className="my-left">
                <button onClick={() => handleMenuClick('user-info')}>유저 정보 </button>
                <button onClick={() => handleMenuClick('user-cart')}>장바구니</button>
                <button onClick={() => handleMenuClick('user-recommend')}>상품 추천</button>
                <button onClick={() => handleMenuClick('user-chatbot')}>챗봇 </button>
            </div>
            <div className="my-body">
                {renderSelectedMenu()}
            </div>
            
        </div>
    )
}

export default MyPage;
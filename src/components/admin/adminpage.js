import React, { useState, useEffect } from 'react';
import './adminpage.css';

import CommandManagement from'./views/CommandManagement' ;
import ProductManagement from './views/ProductManagement';
import PromotionManagement from './views/PromotionManagement';
import SecurityManagement from './views/SecurityManagement';
import SupportManagement from './views/SupportManagement';
import UserManagement from './views/UserManagement';
import { authorize } from '../backpages/authorize'; // 경로를 실제 authorize.js 파일 위치에 맞게 수정하세요

const AdminPage = () => {

    const [selectedMenu, setSelectedMenu] = useState('');
    const [authorized, setAuthorized] = useState(false); // 인증 상태를 저장할 state 추가
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const checkAuthorization = async () => {
            const url = `to_admin_url`; // 실제 사용하시는 API 경로로 변경하세요
            const isAuthorized = await authorize(url);
            setAuthorized(isAuthorized);
            setLoading(false);
        };
        checkAuthorization();
    }, []); // 빈 dependency array를 넘겨주면 컴포넌트가 처음 마운트 될 때만 인증 체크


    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const renderSelectedMenu = () => {
        switch (selectedMenu) {
            case 'user-management':
                return <UserManagement />;
            case 'product-management':
                return <ProductManagement />;
            case 'promotion-management':
                return <PromotionManagement />;
            case 'support-management':
                return <SupportManagement />;
            case 'security-management':
                return <SecurityManagement />;
            case 'command-management':
                return <CommandManagement />;
            default:
                return <div>메뉴를 선택하세요.</div>;
        }
    };

    if (loading) { // 로딩 중일 때
        return <div>인증 상태를 확인하는 중입니다...</div>; // 로딩 메시지를 보여주거나 다른 로딩 컴포넌트를 렌더링할 수 있습니다.
    }

    if (!authorized) { // 인증이 안 된 경우
        window.location.href = 'http://localhost:3000/noauthorize/';
    }

    return (
        <div className="alal-page">
            <div className="alal-left">
                <div className='management-navbar'>
                    <button onClick={() => handleMenuClick('user-management')}>1. 유저 관리</button>
                    <button onClick={() => handleMenuClick('product-management')}>2. 상품 관리</button>
                    <button onClick={() => handleMenuClick('promotion-management')}>3. 홍보 관리</button>
                    <button onClick={() => handleMenuClick('support-management')}>4. 지원 관리</button>
                    <button onClick={() => handleMenuClick('security-management')}>5. 보안</button>
                    <button onClick={() => handleMenuClick('command-management')}>6. 명령</button>
                </div>
            </div>
            <div className="alal-body">
            {renderSelectedMenu()}
            </div>
        </div>
    );
};

export default AdminPage;

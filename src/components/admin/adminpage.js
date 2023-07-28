import React, { useState } from 'react';
import UserManagement from './contents/UserManagement';
import ProductManagement from './contents/ProductManagement';
import PromotionManagement from './contents/PromotionManagement';
import SupportManagement from './contents/SupportManagement';
import SecurityManagement from './contents/SecurityManagement';
import CommandManagement from './contents/CommandManagement';
import './adminpage.css';

const AdminPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('');

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

    return (
        <div className="alal-page">
            <div className="alal-left">
                <button onClick={() => handleMenuClick('user-management')}>1. 유저 관리</button>
                <button onClick={() => handleMenuClick('product-management')}>2. 상품 관리</button>
                <button onClick={() => handleMenuClick('promotion-management')}>3. 홍보 관리</button>
                <button onClick={() => handleMenuClick('support-management')}>4. 지원 관리</button>
                <button onClick={() => handleMenuClick('security-management')}>5. 보안</button>
                <button onClick={() => handleMenuClick('command-management')}>6. 명령</button>
            </div>
            <div className="alal--body">
                {renderSelectedMenu()}
            </div>
        </div>
    );
};

export default AdminPage;

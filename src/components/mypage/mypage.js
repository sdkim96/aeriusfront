import './mypage.css';
import { useState, useEffect } from 'react';
import Case1 from './contents/Case1.js';
import Case2 from './contents/Case2.js';
import Case3 from './contents/Case3.js';
import Case4 from './contents/Case4.js';

const MyPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('');

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    }

    const renderSelectedMenu = () => {
        switch (selectedMenu) {
            case 'c1':
                return <Case1/>;
            case 'c2':
                return <Case2/>;
            case 'c3':
                return <Case3/>;
            case 'c4':
                return <Case4/>;   
            default:
                return <Case1/>;
        }
    }


    return (
        <div className='my-page'>
            <div className="my-left">
                <button onClick={() => handleMenuClick('c1')}>1. </button>
                <button onClick={() => handleMenuClick('c2')}>2. </button>
                <button onClick={() => handleMenuClick('c3')}>3. </button>
                <button onClick={() => handleMenuClick('c4')}>4. </button>
            </div>
            <div className="my-body">
                {renderSelectedMenu()}
            </div>
            
        </div>
    )
}

export default MyPage;
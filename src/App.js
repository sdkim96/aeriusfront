import React, { useState, useEffect } from 'react'; // useState, useEffect 추가

// 루츠, 루트, 브라우저 루터는 react-router-dom 이란 패키지를 설치해야 임포트 할수잇음
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar/navbar.js';
import AboutPage from './components/pages/aboutpage.js';
import StorePage from './components/pages/storepage.js';
import HelpPage from './components/pages/helppage.js';
import LoginPage from './components/pages/loginpage.js';
import MessageList from './components/pages/axios.js';
import MainPage from './components/pages/mainpage.js';
import Footer from './components/footer/footer.js';
import JoinPage from './components/backpages/joinpage.js';
import AdminPage from './components/admin/adminpage.js';
import NoAuthorize from './components/backpages/noauthorize.js';
import MyPage from './components/mypage/mypage.js';
// import Grid from './components/admin/contents/grid.js';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState(false);  // 로그인 상태를 추적하는 state

  useEffect(() => {
      const token = localStorage.getItem('token');
      if(token) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
  }, []);

  useEffect(() => {
    // console.log("IsStaff: ", isStaff); 
    const level = Number(localStorage.getItem('level'));

    if(level && isLoggedIn) {
        setIsStaff(level >= 1);
    } else {
        setIsStaff(false);
    }
  }, [isLoggedIn]);  // 의존성 배열에 'isLoggedIn' 추가



  return (
    <BrowserRouter>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isStaff={isStaff} setIsStaff={setIsStaff} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsStaff={setIsStaff} />} />
        <Route path="/messages" element={<MessageList />} /> {/* 이 줄이 추가되었습니다 */}
        <Route path="/join" element={<JoinPage />} />
        <Route path='/noauthorize' element={<NoAuthorize />} />
        <Route path="/admin" element={<AdminPage isStaff={isStaff} setIsStaff={setIsStaff}/>} />
        <Route path='/mypage' element={<MyPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} isStaff={isStaff} setIsStaff={setIsStaff} />} />
        {/* <Route path='/grid' element={<Grid />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

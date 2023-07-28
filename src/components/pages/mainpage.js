import './mainpage.css';
import video from '../videos/mainpage_video.mp4'
import image1 from '../images/mainpage/i1.jpg'
import image2 from '../images/mainpage/i2.jpg'
import image3 from '../images/mainpage/i3.jpg'
import Footer from '../footer/footer.js';

import React, { useEffect, useRef } from 'react';

const MainPage = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const video = videoRef.current;
                if (entries[0].isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            },
            {
                threshold: 0.1 // 영상이 90퍼 이상 안보이면 재생 멈춤
            }
        );

        observer.observe(videoRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    // body와 html에 대한 스타일 설정
    useEffect(() => {
        // 페이지가 로드되면 body와 html의 스타일 변경
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            // 페이지가 언로드되면 body와 html의 스타일 초기화
            document.body.style.height = null;
            document.body.style.overflow = null;
            document.documentElement.style.height = null;
            document.documentElement.style.overflow = null;
        };
    }, []);

    return (
        <div>
            <div className="main-page">
                <div className="video-section">
                    <video ref={videoRef} src={video} autoPlay muted />
                </div>
                <div className='images-section'>
                    <img src={image1} alt="i1"/>
                    <img src={image2} alt="i2"/>
                    <img src={image3} alt="i3"/>
                </div>
                <div className='footer-section'>
                    <Footer />
                </div>
            </div>
        </div>
    );
};


export default MainPage;

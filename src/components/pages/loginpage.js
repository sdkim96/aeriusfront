import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './loginpage.css';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {

    const [userid, setuserid] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState(null); // 에러메세지 렌더링
    const navigate = useNavigate(); // 홈페이지로 리다이렉트

    const handleMemberSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/myapp/login/', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({userid, password})
            });

            const data = await response.json();

            if (data.token) {
                console.log("홈페이지로 리다이렉트")
                setErrorMessage(null);
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                
                setTimeout(() => {
                    navigate('/');
                  }, 0);

            }

            if (data.error) {
                console.log(data.error)
                setErrorMessage("아이디 or 비밀번호를 확인하세요."); // '/' <p classname = 'warning'>아이디 혹은 비밀번호를 다시 입력해주세요.</p>
            }

        }
        catch (error) {
            console.error('Error: ', error)
            setErrorMessage("An error occurred.");
        }
    }

    return(
        <div className="login-page">
            <div className="login-box">
                <div className="member">
                    <form name='login-form' onSubmit={handleMemberSubmit}>
                        <p className="login-text">login</p>
                        {errorMessage && <p className='warning'>{errorMessage}</p>}
                        <label className="member-id">
                            <p>ID</p>
                            <input type="text" name="login-userid" value={userid} onChange={e => setuserid(e.target.value)} />
                        </label>
                        <label className="member-pw">
                            <p>Password</p>
                            <input type="password" name="login-password" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                        <label className="find-join">
                            <p><a href='/join'>join us</a></p>
                            <p><a href='/search'>search ID or PW</a></p>
                        </label>
                        <button type="submit">login</button>
                    </form>
                </div>
                <div className="non-member">
                    <form name='non-member-form'>
                        <p className="login-text">비회원 주문조회</p>
                        <label className="non-member-id">
                            <p>Name</p>
                            <input type="text" name="non-member-name" />
                        </label>
                        <label className="non-member-pw">
                            <p>Non-member Password</p>
                            <input type="text" name="non-member-pw" />
                        </label>
                        <label className="non-member-order-id">
                            <p>Order ID</p>
                            <input type="text" name="non-member-order-id" />
                        </label>
                        <label className="find-join">
                            {/* <p>find</p> */}
                        </label>
                        <button type="submit">find</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;

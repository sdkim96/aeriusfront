import { useState } from 'react';
import './joinpage.css';

const JoinPage = () => {
    const [userid, setuserid] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [problemFill, setProblemFill] = useState("");
    const [problemPw, setProblemPw] = useState("");
    const [problemPwForm, setProblemPwForm] = useState("")
    const [problemIdForm, setProblemIdFrom] = useState("")
    const [problemuserid, setProblemuserid] = useState(""); // 기존 id와 충돌되지 않는지

    // const noregistableid = [super, admin]
    // const noregistablenickname = [super, admin ]


    const handleSubmit = async (e) => {
        e.preventDefault();  // prevent the default form submission
        
        // Reset error messages
        setProblemFill("");
        setProblemPw("");
        setProblemPwForm("");
        setProblemuserid("");
        let isregistable = false;
        let condition1 = false;
        let condition2 = false;
        let condition3 = false;
        let condition4 = false;
    
        if (userid === "" || nickname === "" || password === "" || passwordCheck === "" || email === "" || phone === "") {
            setProblemFill('필드를 다 채워주세요.');
            
        } else {condition1 = true;}
        
        const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

        if (!idRegex.test(userid)) {
            setProblemIdFrom('아이디는 6~20자의 영문자, 숫자를 포함해야 합니다.');
        } else {condition4 = true;}

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&+])[A-Za-z\d@$!%*#?&+]{6,20}$/;

        if (!passwordRegex.test(password)) {
            setProblemPwForm('패스워드는 6~20자의 영문자, 숫자, 특수문자를 포함해야 합니다.');
        } else {condition2 = true;}
    
        if (password !== passwordCheck) {
            setProblemPw('패스워드를 다시 체크해주세요.');
        } else {condition3 = true;}

        if (condition1 && condition2 && condition3 && condition4) {
            isregistable=true;
        }
    

    
        // If there were no problems, then you can submit the form data
        if (isregistable) {
            try {
                const response = await fetch('http://localhost:8000/myapp/checkuser/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userid, nickname, password, email, phone }),
                });
            
                const data = await response.json();
            
                if (!response.ok) {
                    // 서버가 반환하는 오류 메시지가 있다면 사용하고, 그렇지 않으면 HTTP 상태 코드를 사용합니다.
                    const errorMsg = data.error ? data.error : `HTTP error! status: ${response.status}`;
                    throw new Error(errorMsg);
                }
            
                if (data.message) {
                    console.log("아이디 등록완료.")
                    setProblemuserid("아이디 등록완료.")
                }
    
                if (data.error) {
                    console.log(data.error)
                    setProblemuserid(data.error)
                }
                
            
            } catch (error) {
                console.error('Error:', error);
                // 서버에서 반환한 에러 메시지 혹은 자바스크립트 에러를 처리합니다.
                setProblemuserid(error.message);
            }
            
        }
    }
    

    

    return (
        <div>
            <div className='join-page'>
                <div className='join-box'>
                    <form name='join-form' onSubmit={handleSubmit}>
                        <p className="join-text">Join our community!</p>
                        {problemFill && <p className='warning'>{problemFill}</p>}
                        {problemIdForm && <p className='warning'>{problemIdForm}</p>}
                        {problemPw && <p className='warning'>{problemPw}</p>}
                        {problemPwForm && <p className='warning'>{problemPwForm}</p>}
                        {problemuserid && <p className='warning'>{problemuserid}</p>}
                        <label className="join-userid">
                            <p>ID</p>
                            <input type="text" name="join-userid" value={userid} onChange={e => setuserid(e.target.value)} />
                        </label>
                        <label className="join-name">
                            <p>Nickname</p>
                            <input type="text" name="join-nickname" value={nickname} onChange={e => setNickname(e.target.value)}/>
                        </label>
                        <label className="join-pw">
                            <p>Password</p>
                            <input type="password" name="join-password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <label className="join-pw-check">
                            <p>Check Password</p>
                            <input type="password" name="join-password-check" value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)}/>
                        </label>
                        <label className="join-email">
                            <p>E-mail</p>
                            <input type="text" name="join-email" value={email} onChange={e => setEmail(e.target.value)}/>
                        </label>
                        <label className="join-phone">
                            <p>Phone</p>
                            <input type="text" name="join-phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                        </label>
                        <label className="find-join">
                            {/* <p>find</p> */}
                        </label>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default JoinPage;
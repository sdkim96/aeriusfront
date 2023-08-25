const Info = ({ userData }) => {
    if (!userData) {
        return <div></div>;
    }
    const { nickname, phone, userid, email, created_at } = userData;

    return(
        <div className="user-info">
            <h1>안녕하세요 {nickname}님!</h1>
            <div className="user-info-window">
                <form name='your-form'>
                    <label className="your-id">
                        <p>아이디</p>
                        <input type="text" name="user-id" value={userid} readOnly />
                    </label>
                    <label className="your-password">
                        <p>비밀번호</p>
                        <input type="password" name="user-password" value="******" readOnly /> {/* 패스워드는 표시하지 않습니다 */}
                    </label>
                    <label className="your-email">
                        <p>이메일</p>
                        <input type="text" name="user-email" value={email} readOnly />
                    </label>
                    <label className="your-phone">
                        <p>핸드폰번호</p>
                        <input type="text" name="user-phone" value={phone} readOnly />
                    </label>
                    <label className="user-created-at">
                        <p>가입일자</p>
                        <input type="text" name="user-created-at" value={created_at} readOnly />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default Info;

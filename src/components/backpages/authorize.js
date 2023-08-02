import { useState } from 'react';

export const authorize = async (url) => {
    const token = localStorage.getItem('token');
    console.log(token)
    
    try {
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

        return data.result;
    } catch (error) {
        console.error('An error occurred:', error);
        return false;
    }
}

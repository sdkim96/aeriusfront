import React, { useState } from "react";
import './helppage.css'

const reviewDatas = [
    { id: 1, title: 'reviewPost 1', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 2, title: 'reviewPost 2', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 3, title: 'reviewPost 3', author: 'Author 1', date: '2021-07-01', image: '' },
    //... more posts
];

const qnaDatas = [
    { id: 1, title: 'qnaPost 1', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 2, title: 'qnaPost 2', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 3, title: 'qnaPost 3', author: 'Author 1', date: '2021-07-01', image: '' },
    //... more posts
];

const noticeDatas = [
    { id: 1, title: 'noticeost 1', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 2, title: 'noticeost 2', author: 'Author 1', date: '2021-07-01', image: '' },
    { id: 3, title: 'noticeost 3', author: 'Author 1', date: '2021-07-01', image: '' },
    //... more posts
];


const HelpPage = () => {

    const [categoryState, setCategoryState] = useState('review');

    let displayedData = [];
    switch (categoryState) {
        case 'review':
            displayedData = reviewDatas;
            break;
        case 'qna':
            displayedData = qnaDatas;
            break;
        case 'notice':
            displayedData = noticeDatas;
            break;
        default:
            displayedData = reviewDatas;
    }

    const handleCategoryChange = (e) => {
        setCategoryState(e.target.value);
    }

    return(
        <div className="help-page">
            <div className="query">
                <input type="search" placeholder="키워드 검색"/>
                <select name="categories" id="categories" value={categoryState} onChange={handleCategoryChange}>
                    <option value="review">Review</option>
                    <option value="qna">QnA</option>
                    <option value="notice">Notice</option>
                </select>
            </div>
            <div className="datas">
                {displayedData.map((data) => (
                    <div key={data.id} className="data">
                        <h2 className="data-title">{data.title}</h2>
                        <p className="data-author">{data.author}</p>
                        <p className="data-date">{data.date}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HelpPage;

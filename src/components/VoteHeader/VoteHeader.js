import React from 'react';
import './VoteHeader.css';

const VoteHeader = ({ content }) => {
	return (
		<div className='vote-header-container'>
			<button className="btn btn-primary" onClick={() => window.location.href = '/'}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" viewBox="0 0 16 25" fill="none">
					<line x1="2.06066" y1="11.9393" x2="14.0607" y2="23.9393" stroke="white" strokeWidth="3"/>
					<line x1="1.93934" y1="13.9393" x2="13.9393" y2="1.93934" stroke="white" strokeWidth="3"/>
				</svg>
			</button>
			<div className='vote-header-title'>
				<p>{content}</p>
			</div>
		</div>
	);
};

export default VoteHeader;

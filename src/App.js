import React from 'react';
import { atom, useRecoilState } from 'recoil';

// 상태 정의
const textState = atom({
  key: 'textState', // 고유한 ID
  default: '', // 기본값
});

function App() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      입력한 텍스트: {text}
    </div>
  );
}
export default App;

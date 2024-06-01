import { useCallback } from 'react';

export default function useBodyScrollLock() {
  //모달이 열렸을 때 스크롤을 막는다
  const lockScroll = useCallback(() => {
    document.body.style.cssText = `
    position:fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
    `;
  }, []);

  // 모달이 닫혔을 때 스크롤을 활성화 한다.
  const openScroll = useCallback(() => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }, []);

  return { lockScroll, openScroll };
}

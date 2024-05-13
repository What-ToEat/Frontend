import React from 'react';
import { useRecoilState } from 'recoil';
import { selectedNavItemState } from '../../recoil/state';
import './TagNav.css';

const TagNav = () => {
  const navItems = ['전체', '강남', '홍대', '잠실', '건대', '신촌'];
  const [selectedItem, setSelectedItem] = useRecoilState(selectedNavItemState);

  return (
    <nav className="tag-nav">
      {navItems.map((item, index) => (
        <React.Fragment key={item}>
          <button
            className={`nav-item ${selectedItem === item ? 'selected' : ''}`}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </button>
          {index < navItems.length - 1 && <div className="tag-nav-divider"></div>}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default TagNav;

import { atom } from 'recoil';

export const selectedTagsState = atom({
  key: 'selectedTagsState',
  default: [],
});

export const selectedNavItemState = atom({
  key: 'selectedNavItemState',
  default: '전체',
});

export const isTagListExpandedState = atom({
  key: 'isTagListExpandedState',
  default: false,
});

import React, { useEffect, useState } from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagNav from '../../components/TagNav/TagNav';
import TagList from '../../components/TagList/TagList';
import { useRecoilState } from 'recoil';
import { selectedTagsState, selectedNavItemState } from '../../recoil/state';


const ViewPage = () => {
  const [tags, setTags] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedNavItem, setSelectedNavItem] = useRecoilState(selectedNavItemState);
  const [selectedTags, setSelectedTags] = useRecoilState(selectedTagsState);

  useEffect(() => {
    fetch("http://43.202.161.19:8080/api/tags")
      .then(response => response.json())
      .then(({data: {tags}}) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  useEffect(() => {
    let url = 'http://43.202.161.19:8080/api/restaurants/tag?page=1';
    if (selectedNavItem !== '전체') {
        url += `&place=${selectedNavItem}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(({data: {restaurants}}) => {
        setRestaurants(restaurants);
        setSelectedTags([]); // Reset selected tags
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, [selectedNavItem]);

  return (
    <div className='view-page'>
      <Logo/>
      <SearchBar/>
      <TagNav/>
      <TagList tags={tags}/>
			<RestaurantView restaurants={restaurants}/>
		</div>
  );
};

export default ViewPage;

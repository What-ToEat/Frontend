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
  const [searchResults, setSearchResults] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

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
        setSearchResults(null);
        setSearchKeyword('');
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, [selectedNavItem]);

  const handleSearch = (keyword) => {
    const url = `http://43.202.161.19:8080/api/restaurants/keyword?keyword=${keyword}&page=1`;

    fetch(url)
      .then(response => response.json())
      .then(({data: {restaurants}}) => {
        setSearchResults(restaurants);
        setSelectedTags([]);
        setSearchKeyword(keyword);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  };

  const handleTagSearch = () => {
    let url = 'http://43.202.161.19:8080/api/restaurants/tag?page=1';
    if (selectedNavItem !== '전체') {
      url += `&place=${encodeURIComponent(selectedNavItem)}`;
    }
    if (selectedTags.length > 0) {
      const tagParams = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      url += `&${tagParams}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(({data: {restaurants}}) => {
        setRestaurants(restaurants);
        setSearchResults(null);
        setSearchKeyword('');
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  };

  return (
    <div className='view-page'>
      <Logo/>
      <SearchBar onSearch={handleSearch} />
      <TagNav/>
      <TagList tags={tags} onSearch={handleTagSearch}/>
			<RestaurantView 
        restaurants={searchResults !== null ? searchResults : restaurants} 
        searchKeyword={searchKeyword} 
      />
		</div>
  );
};

export default ViewPage;

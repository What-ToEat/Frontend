import React, { useEffect, useState } from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagNav from '../../components/TagNav/TagNav';
import TagList from '../../components/TagList/TagList';

import { mockRestaurants } from './mock.js';

const ViewPage = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("http://43.202.161.19:8080/api/tags")
      .then(response => response.json())
      .then(({data: {tags}}) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  return (
    <div className='view-page'>
      <Logo/>
      <SearchBar/>
      <TagNav/>
      <TagList tags={tags}/>
			<RestaurantView restaurants={mockRestaurants}/>
		</div>
  );
};

export default ViewPage;

import React from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagNav from '../../components/TagNav/TagNav';
import TagList from '../../components/TagList/TagList';

import { mockRestaurants, mockTags } from './mock.js';

const ViewPage = () => {

  return (
    <div className='view-page'>
      <Logo/>
      <SearchBar/>
      <TagNav/>
      <TagList tags={mockTags}/>
			<RestaurantView restaurants={mockRestaurants}/>
		</div>
  );
};

export default ViewPage;



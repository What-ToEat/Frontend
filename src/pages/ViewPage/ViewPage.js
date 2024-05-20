import React, { useEffect, useState } from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetch("http://43.202.161.19:8080/api/tags")
      .then(response => response.json())
      .then(({ data: { tags } }) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  useEffect(() => {
    let url = 'http://43.202.161.19:8080/api/restaurants/tag?page=1';
    if (selectedNavItem !== '전체') {
        url += `&place=${selectedNavItem}`;
    }

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(({data: {restaurants}}) => {
        setRestaurants(restaurants);
        setSelectedTags([]); // Reset selected tags
        setSearchResults(null);
        setSearchKeyword('');
        setCurrentPage(1); // Reset current page
        setHasMore(restaurants.length > 0); // Set hasMore based on initial data
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      });
  }, [selectedNavItem]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading && hasMore) {
        loadMoreRestaurants();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, currentPage, selectedNavItem, selectedTags]);

  const loadMoreRestaurants = () => {
    const nextPage = currentPage + 1;
    let url = `http://43.202.161.19:8080/api/restaurants/tag?page=${nextPage}`;
    if (selectedNavItem !== '전체') {
      url += `&place=${encodeURIComponent(selectedNavItem)}`;
    }
    if (selectedTags.length > 0) {
      const tagParams = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      url += `&${tagParams}`;
    }

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants: fetchedRestaurants } }) => {
        setRestaurants(prevRestaurants => [...prevRestaurants, ...fetchedRestaurants]);
        setCurrentPage(nextPage); // Update current page
        setHasMore(fetchedRestaurants.length > 0); // Check if more data is available
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching more restaurants:', error);
        setIsLoading(false);
      });
  };

  const handleSearch = (keyword) => {
    const url = `http://43.202.161.19:8080/api/restaurants/keyword?keyword=${encodeURIComponent(keyword)}&page=1`;

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants } }) => {
        setSearchResults(restaurants);
        setSearchKeyword(keyword);
        setIsLoading(false);
        setCurrentPage(1); // Reset current page
        setHasMore(restaurants.length > 0); // Set hasMore based on search results
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      });
  };

  const handleTagSearch = () => {
    setCurrentPage(1);
    let url = 'http://43.202.161.19:8080/api/restaurants/tag?page=1';
    if (selectedNavItem !== '전체') {
      url += `&place=${encodeURIComponent(selectedNavItem)}`;
    }
    if (selectedTags.length > 0) {
      const tagParams = selectedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      url += `&${tagParams}`;
    }

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants: fetchedRestaurants } }) => {
        setRestaurants(fetchedRestaurants);
        setSearchResults(null);
        setSearchKeyword('');
        setIsLoading(false);
        setHasMore(fetchedRestaurants.length > 0); // Set hasMore based on tag search results
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className='view-page'>
      <Logo />
      <SearchBar onSearch={handleSearch} />
      <TagNav />
      <TagList tags={tags} onSearch={handleTagSearch} />
      <RestaurantView 
        restaurants={searchResults !== null ? searchResults : restaurants} 
        searchKeyword={searchKeyword} 
      />
      {isLoading && (
        <div className="view-page-loading">
          <div className="spinner"></div>
          Loading...
        </div>
      )}
    </div>
  );
};

export default ViewPage;

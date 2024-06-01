import React, { useEffect, useState } from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import TagNav from '../../components/TagNav/TagNav';
import TagList from '../../components/TagList/TagList';
import { useRecoilState } from 'recoil';
import { selectedTagsState, selectedNavItemState } from '../../recoil/state';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

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
  const query = useQuery();

  useEffect(() => {
    const initialNavItem = query.get('place') || '전체';
    const initialTags = query.getAll('tags');

    setSelectedNavItem(initialNavItem);
    setSelectedTags(initialTags);

    fetchTags();
    fetchRestaurants(initialNavItem, initialTags, 1);
  }, []);

  const fetchTags = () => {
    fetch("http://43.200.168.42:8080/api/tags")
      .then(response => response.json())
      .then(({ data: { tags } }) => setTags(tags))
      .catch(error => console.error('Error fetching tags:', error));
  };

  const fetchRestaurants = (navItem, tags, page) => {
    let url = `http://43.200.168.42:8080/api/restaurants/tag?page=${page}`;
    if (navItem !== '전체') {
      url += `&place=${encodeURIComponent(navItem)}`;
    }
    if (tags.length > 0) {
      const tagParams = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
      url += `&${tagParams}`;
    }

    setIsLoading(true);

    fetch(url)
      .then(response => response.json())
      .then(({ data: { restaurants } }) => {
        if (page === 1) {
          setRestaurants(restaurants);
        } else {
          setRestaurants(prevRestaurants => [...prevRestaurants, ...restaurants]);
        }
        setHasMore(restaurants.length > 0); // Set hasMore based on fetched data
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching restaurants:', error);
        setIsLoading(false);
      });
  };

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
    fetchRestaurants(selectedNavItem, selectedTags, nextPage);
    setCurrentPage(nextPage); // Update current page
  };

  const handleSearch = (keyword) => {
    const url = `http://43.200.168.42:8080/api/restaurants/keyword?keyword=${encodeURIComponent(keyword)}&page=1`;

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
    fetchRestaurants(selectedNavItem, selectedTags, 1);
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

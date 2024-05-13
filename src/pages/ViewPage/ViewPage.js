import React from 'react';
import './ViewPage.css';
import RestaurantView from '../../components/RestaurantView/RestaurantView';
import Logo from '../../components/Logo/Logo'
import SearchBar from '../../components/SearchBar/SearchBar'
import TagNav from '../../components/TagNav/TagNav';
import TagList from '../../components/TagList/TagList';

const ViewPage = () => {
	// Mock Data
  const restaurantInfo = {
    name: "맛있는 식당",
    thumbnail: "https://img.hankyung.com/photo/202103/0Q.25813444.1.jpg",
    tags: ["맛집", "맛집", "맛집", "맛집", "맛집", "맛집", "맛집"]
  };
  const restaurantInfo2 = {
    name: "경주에서 제일 맛있는 초초초초초맛집",
    thumbnail: "https://www.gyeongju.go.kr/upload/content/thumb/20201228/5DE22B6931D74EF9B333A081342A41F4.jpg",
    tags: ["데이트", "가족과 함께", "가족과 함께", "한식", "경주"]
  };
  const restaurants = [restaurantInfo, restaurantInfo2, restaurantInfo, restaurantInfo2, restaurantInfo, restaurantInfo2, restaurantInfo, restaurantInfo2, restaurantInfo, restaurantInfo2, restaurantInfo, restaurantInfo2];

  const tags = [
    '트렌디', '독특한 인테리어', '가족 모임', '특별한 날', '힙한', '가성비',
    '반려동물 동반', '생일 파티', '야외석', '혼자 오기 좋은', '이탈리안', '요즘 핫한',
    '술집', '캐주얼', 'TV 출연 맛집', '프리미엄', '로맨틱한 분위기', '전통적인',
    '비건 옵션', '해산물 전문', '브런치 카페', '라이브 음악', '뷔페 스타일', '퓨전 요리',
    '저녁 데이트', '어린이 친화적', '뷰가 좋은', '레트로 감성', '유기농 재료', '공원 근처',
    '야경이 멋진', '현지인 추천', '스페셜 메뉴', '바베큐', '디저트 카페', '채식주의자 친화적',
    '지역 특산물', '새벽까지 영업', '주말 브런치', '계절 한정 메뉴'
  ];

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



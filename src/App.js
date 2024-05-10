import React from 'react';
import RestaurantView from './components/RestaurantView/RestaurantView';
import SelectableTag from './components/Tag/SelectableTag'

function App() {
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
    '트렌디', '독특한인테리어', '가족모임', '특별한날', '힙한', '가성비',
    '반려동물동반', '생일파티', '야외석', '혼자오기좋은', '이탈리안', '요즘핫한',
    '술집', '캐주얼', 'TV출연맛집', '프리미엄'
  ];

  return (
    <>
      <div>
        {tags.map((tag) => (
          <SelectableTag key={tag} name={tag} />
        ))}
      </div>
      <RestaurantView restaurants={restaurants}/>
    </>
  );
}
export default App;

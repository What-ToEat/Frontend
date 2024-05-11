import React from 'react';
import RestaurantView from './components/RestaurantView/RestaurantView';

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

  return (
    <RestaurantView restaurants={restaurants}/>
  );
}
export default App;

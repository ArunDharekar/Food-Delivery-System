import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState('');

  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/api/auth/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel search={search} setSearch={setSearch} />

      <div className='container'>
        {foodCat.length > 0 &&
          foodCat.map((data) => (
            <div className='row mb-3' key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr
                style={{
                  height: "4px",
                  backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))"
                }}
              />
              {
                foodItems
                  .filter(item =>
                    item.CategoryName === data.CategoryName &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItem) => (
                    <div key={filterItem._id} className='col-12 col-md-6 col-lg-3'>
                      <Card
                        foodName={filterItem.name}
                        item={filterItem}
                        options={filterItem.options[0]}
                        ImgSrc={filterItem.img}
                      />
                    </div>
                  ))
              }
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

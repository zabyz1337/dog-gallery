import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://dog.ceo/api/breeds/image/random";

export default function DogGallery() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchInitialDogs();
  }, []);

  const fetchInitialDogs = async () => {
    setIsLoading(true);
    try {
      const requests = [axios.get(API), axios.get(API), axios.get(API)];

      const responses = await Promise.all(requests);
      const urls = responses.map((res) => res.data.message);
      setDogs(urls);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDog = async () => {
    setIsAdding(true);
    try {
      const response = await axios.get(API);
      setDogs((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dog Gallery</h2>

      <div>
        <strong>Загружено собак: {dogs.length}</strong>
      </div>

      {isLoading && <p>Загрузка...</p>}

      <div style={{ display: "flex", gap: 10, margin: "15px 0" }}>
        <button onClick={handleAddDog} disabled={isAdding}>
          {isAdding ? "Добавляю..." : "Добавить собаку"}
        </button>

        <button>Обновить всё</button>
        <button>Очистить всё</button>
      </div>

      <div>
        {dogs.map((dog, index) => (
          <img
            key={index}
            src={dog}
            alt="dog"
            width="200"
            style={{ marginRight: 10 }}
          />
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://dog.ceo/api/breeds/image/random";

export default function DogGallery() {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialDogs();
  }, []);

  const fetchInitialDogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const requests = [axios.get(API), axios.get(API), axios.get(API)];
      const responses = await Promise.all(requests);
      const urls = responses.map((res) => res.data.message);
      setDogs(urls);
    } catch (error) {
      console.error(error);
      setError("Ошибка загрузки собак");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDog = async () => {
    setIsAdding(true);
    setError(null);
    try {
      const response = await axios.get(API);
      setDogs((prev) => [...prev, response.data.message]);
    } catch (error) {
      console.error(error);
      setError("Ошибка загрузки собак");
    } finally {
      setIsAdding(false);
    }
  };

  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const count = dogs.length || 3;
      const requests = Array.from({ length: count }, () => axios.get(API));
      const responses = await Promise.all(requests);
      const urls = responses.map((res) => res.data.message);
      setDogs(urls);
    } catch (error) {
      console.error(error);
      setError("Ошибка загрузки собак");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Dog Gallery</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <strong>Загружено собак: {dogs.length}</strong>
      </div>

      {isLoading && <p>Загрузка...</p>}

      <div style={{ display: "flex", gap: 10, margin: "15px 0" }}>
        <button onClick={handleAddDog} disabled={isAdding}>
          {isAdding ? "Добавляю..." : "Добавить собаку"}
        </button>

        <button onClick={handleRefreshAll} disabled={isRefreshing}>
          {isRefreshing ? "Обновляю..." : "Обновить всё"}
        </button>

        <button onClick={() => setDogs([])}>Очистить всё</button>
      </div>

      <div>
        {dogs.map((dog, index) => (
          <img
            key={`${dog}-${index}`}
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

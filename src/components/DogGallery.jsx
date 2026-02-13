import React from "react";

export default function DogGallery() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Dog Gallery</h2>

      <div style={{ marginBottom: 10 }}>
        <strong>Загружено собак: 0</strong>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
        <button>Добавить собаку</button>
        <button>Обновить всё</button>
        <button>Очистить всё</button>
      </div>

      <div>Здесь фото</div>
    </div>
  );
}


import { useState } from "react";
import "./EditMovie.css";

function EditMovie({ movie, onUpdateMovie, onCancel }) {
  const [formData, setFormData] = useState({
    title: movie.title,
    genre: movie.genre,
    year: movie.year,
    rating: movie.rating,
    status: movie.status
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateMovie({
      ...formData,
      id: movie.id,
      year: Number(formData.year),
      rating: Number(formData.rating)
    });

    onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Filmi Düzenle</h3>

      <label>Film Adı</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label>Film Türü</label>
      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
      >
        <option value="Bilim Kurgu">Bilim Kurgu</option>
        <option value="Aksiyon">Aksiyon</option>
        <option value="Dram">Dram</option>
        <option value="Komedi">Komedi</option>
        <option value="Korku">Korku</option>
        <option value="Romantik">Romantik</option>
      </select>

      <label>Yayın Yılı</label>
      <input
        type="number"
        name="year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <label>Puan</label>
      <input
        type="number"
        name="rating"
        min="1"
        max="10"
        value={formData.rating}
        onChange={handleChange}
        required
      />

      <label>İzleme Durumu</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="watched">İzledim</option>
        <option value="planned">İzleyeceğim</option>
      </select>

      <button type="submit">Değişiklikleri Kaydet</button>

      <button type="button" onClick={onCancel}>
        İptal
      </button>
    </form>
    
  );
}

export default EditMovie;

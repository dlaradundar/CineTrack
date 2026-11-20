
import { useState } from "react";
import "./MovieForm.css";

function MovieForm({ onAddMovie }) {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    year: "",
    rating: "",
    status: "watched",
    poster: ""
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

    if (!formData.title.trim() || !formData.genre || !formData.year || !formData.rating) {
      alert("Lütfen tüm alanları doldur!");
      return;
    }

    onAddMovie({
      ...formData,
      year: Number(formData.year),
      rating: Number(formData.rating),
      id: Date.now()
    });

    setFormData({
      title: "",
      genre: "",
      year: "",
      rating: "",
      status: "watched",
      poster: ""
    });
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Film Adı</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Örn: Interstellar"
        />
      </div>
      <div className="form-group">
        <label>Film Afişi URL</label>
        <input
          type="url"
          name="poster"
          value={formData.poster}
          onChange={handleChange}
          placeholder="https://ornek.com/film-afisi.jpg"
        />
      </div>

      <div className="form-group">
        <label>Film Türü</label>
        <select name="genre" value={formData.genre} onChange={handleChange}>
          <option value="">Tür seçiniz</option>
          <option value="Bilim Kurgu">Bilim Kurgu</option>
          <option value="Aksiyon">Aksiyon</option>
          <option value="Dram">Dram</option>
          <option value="Komedi">Komedi</option>
          <option value="Korku">Korku</option>
          <option value="Romantik">Romantik</option>
        </select>
      </div>

      <div className="form-group">
        <label>Yayın Yılı</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="2026"
        />
      </div>

      <div className="form-group">
        <label>Puan (10 üzerinden)</label>
        <input
          type="number"
          name="rating"
          min="1"
          max="10"
          value={formData.rating}
          onChange={handleChange}
          placeholder="9"
        />
      </div>

      <div className="form-group">
        <label>İzleme Durumu</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="watched">İzledim</option>
          <option value="planned">İzleyeceğim</option>
        </select>
      </div>

      <button type="submit">Film Ekle</button>
    </form>
  );
}

export default MovieForm;

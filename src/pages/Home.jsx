
import MovieForm from "../components/MovieForm";
import EditMovie from "../components/EditMovie";
import "./Home.css";
import { useState } from "react";

function Home({   
  movies,
  onAddMovie,
  onDeleteMovie,
  onUpdateMovie 
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tümü");
  const [editingMovie, setEditingMovie] = useState(null);
  const filteredMovies = movies.filter((movie) => {
  const matchesSearch = movie.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesGenre =
    selectedGenre === "Tümü" ||
    movie.genre === selectedGenre;

  return matchesSearch && matchesGenre;
});
const totalMovies = movies.length;

const watchedMovies = movies.filter(
  (movie) => movie.status === "watched"
).length;

const plannedMovies = movies.filter(
  (movie) => movie.status === "planned"
).length;
  return (
    <main className="home">
      <section className="welcome">
        <span className="welcome-label">
          MY PERSONAL CINEMA
        </span>

        <h1>Film dünyana hoş geldin.</h1>

        <p>
          İzlediğin filmleri keşfet, arşivle ve
          kendi sinema koleksiyonunu oluştur.
        </p>
      </section>
      <section className="stats">
  <div className="stat-card">
    <h3>Toplam Film</h3>
    <p>{totalMovies}</p>
  </div>

  <div className="stat-card">
    <h3>İzlenen</h3>
    <p>{watchedMovies}</p>
  </div>

  <div className="stat-card">
    <h3>İzlenecek</h3>
    <p>{plannedMovies}</p>
  </div>
</section>

      <section className="movie-section">
        <h2>Yeni Film Ekle</h2>

        <MovieForm onAddMovie={onAddMovie} />

        <div className="section-header">
          <h2>Film Arşivim ({movies.length})</h2>
        </div>

<div className="filter-area">
  <input
    type="text"
    placeholder="Film ara..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
  >
    <option value="Tümü">Tüm Türler</option>
    <option value="Bilim Kurgu">Bilim Kurgu</option>
    <option value="Aksiyon">Aksiyon</option>
    <option value="Dram">Dram</option>
    <option value="Komedi">Komedi</option>
    <option value="Korku">Korku</option>
    <option value="Romantik">Romantik</option>
  </select>
</div>
{editingMovie && (
  <EditMovie
    movie={editingMovie}
    onUpdateMovie={onUpdateMovie}
    onCancel={() => setEditingMovie(null)}
  />
)}
<div className="movie-list">
  {filteredMovies.map((movie) => (
    <div className="movie-item" key={movie.id}>
      {movie.poster ? (
        <img
          src={movie.poster}
          alt={`${movie.title} film afişi`}
          className="movie-poster"
        />
      ) : (
        <div className="movie-poster-placeholder">
          🎬
          <span>Afiş bulunamadı</span>
        </div>
      )}
      <h3>{movie.title}</h3>

      <p>{movie.genre} • {movie.year}</p>

      <p>⭐ {movie.rating}/10</p>

      <span className={`status-badge ${movie.status}`}>
        {movie.status === "watched"
          ? "İzledim"
          : "İzleyeceğim"}
      </span>

      <div className="movie-actions">
      <button onClick={() => setEditingMovie(movie)}>
        Düzenle
      </button>

        <button
          onClick={() => {
            const confirmDelete = window.confirm(
              "Bu filmi silmek istediğine emin misin?"
            );

            if (confirmDelete) {
              onDeleteMovie(movie.id);
            }
          }}
        >
          Sil
        </button>
      </div>
    </div>
  ))}
</div>

      </section>
    </main>
  );
}

export default Home;

"use client";

import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/shared/api";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  /**
   * @todo Add type for movies
   */
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    getMovies({ sort_by: "popularity.desc", page: 1 }).then((data) =>
      setMovies(data.results)
    );
  }, []);

  if (!movies || !movies.length) {
    return <div>Loading...</div>;
  }

  return (
    <main className={styles.main}>
      <div className={styles.carousel}>
        <h2>{`${movies.length} most popular movies`}</h2>
        <div className={styles.container}>
          {movies.map((movie) => {
            return <MovieCard key={movie.id} movie={movie} />;
          })}
        </div>
      </div>
    </main>
  );
}

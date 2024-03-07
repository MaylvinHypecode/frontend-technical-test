import Image from "next/image";
import styles from "./styles.module.scss";
import { useState } from "react";
import ModalDetails from "@/components/ModalDetails";

export const imagePath = `https://image.tmdb.org/t/p/original`;

/**
 * @todo Add type for movie
 */
type Props = {
  movie: any;
};

const MovieCard = ({ movie }: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.card} onClick={() => setIsOpen(true)}>
        <div className={styles.image}>
          <Image
            alt={movie.original_title}
            src={imagePath + movie.poster_path}
            width={150}
            height={225}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{movie.original_title}</h3>
          <p>{movie.release_date}</p>
          <p>{`${Math.round(movie.vote_average * 10) / 10} / 10`}</p>
        </div>
      </div>

      {
        isOpen && <ModalDetails movieId={movie.id} handleOpen={isOpen}/>
      }
    </>
  );
};

export default MovieCard;

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getMovieId } from "@/shared/api";
import Image from "next/image";

type Props = {
  movieId: string;
  handleOpen: boolean;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const imagePath = `https://image.tmdb.org/t/p/original`;

const ModalDetails = ({ movieId, handleOpen }: Props) => {
  const [open, setOpen] = React.useState(handleOpen);
  const [movieDetails, setMovieDetails] = useState<any[]>([]);

  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    try {
      const response = await getMovieId(movieId);
      setMovieDetails(response);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [movieId]);

  return (
    <div>
      {
        open && movieDetails ? (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Image
                  alt={movieDetails?.original_title}
                  src={imagePath + movieDetails?.poster_path}
                  width={150}
                  height={225}
                />
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {movieDetails?.title}
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {movieDetails?.overview}
                </Typography>
                {
                  !!movieDetails.genres && <Typography sx={{ display: "flex" }}>
                    Genres :
                    {
                      movieDetails?.genres.map((result: Record<string, string>, index: number) => (
                        <Box sx={{
                          padding: '0 5px'
                        }}>
                          {result.name}
                        </Box>
                      ))
                    }
                  </Typography>
                }
              </Box>
            </Fade>
          </Modal>
        ) : (
          <>
          </>
        )
      }

    </div>
  );
}

export default ModalDetails;

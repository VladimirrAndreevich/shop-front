import { useState } from "react";
import { CardMedia, Grid } from "@mui/material";
import DecorationActiveImage from "./styled";

type GalleryWithChoiceProps = {
  images: string[];
  title: string;
};

const GalleryWithChoice: React.FC<GalleryWithChoiceProps> = ({
  images,
  title,
}) => {
  const [activeImage, setActiveImage] = useState(0);

  const getPath = (image: string) => {
    return `${process.env.API_URL_IMAGES}/${image}`;
  };

  return (
    <>
      <CardMedia
        sx={{
          height: { xs: "340px" },
          backgroundSize: "contain",
        }}
        image={getPath(images[activeImage])}
        title={`The image of ${title}`}
      />

      <Grid container spacing="12px">
        {images.map((image, index) => (
          <Grid item xs={4} key={index} onClick={() => setActiveImage(index)}>
            <CardMedia
              sx={{
                height: "140px",
                backgroundSize: "contain",
                marginBottom: "5px",
                cursor: "pointer",
              }}
              image={`${process.env.API_URL_IMAGES}/${image}`}
              title={`The image of ${title}`}
            />
          </Grid>
        ))}
      </Grid>
      <DecorationActiveImage activeImage={activeImage} images={images} />
    </>
  );
};

export default GalleryWithChoice;

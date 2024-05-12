import { useState } from "react";
import {
  AdditionalImageBox,
  AdditionalImagesWrapper,
  MainImageWrapper,
} from "./styled";
import Image from "next/image";

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

  const additionalImages = (
    <>
      {images.map((image, index) => {
        const pathImg = getPath(image);

        return (
          <AdditionalImageBox onClick={() => setActiveImage(index)}>
            <Image
              key={index}
              src={`${process.env.API_URL_IMAGES}/${image}`}
              alt={`The image of ${title}`}
              fill
              style={{
                objectFit: "cover",
              }}
              priority
            />
          </AdditionalImageBox>
        );
      })}
    </>
  );

  return (
    <>
      <MainImageWrapper>
        <Image
          src={getPath(images[activeImage])}
          alt={`The image of ${title}`}
          fill
          priority
        />
      </MainImageWrapper>

      <AdditionalImagesWrapper $amount={images.length}>
        {additionalImages}
      </AdditionalImagesWrapper>
    </>
  );
};

export default GalleryWithChoice;

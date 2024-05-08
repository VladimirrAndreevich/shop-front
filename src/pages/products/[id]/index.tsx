import Image from "next/image";
import { GetServerSideProps } from "next";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { I_ProductCard, I_ProductRes } from "@/types";
import GalleryWithChoice from "@/components/GalleryWithChoice/GalleryWithChoice";
import Button from "@/components/Button/Button";
import { InnerWrapper } from "./styled";
import Sizes from "@/components/Sizes/Sizes";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  const id = params.id;

  const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
  const formattedRes: I_ProductRes = await res.json();

  return { props: { dataProduct: formattedRes.data } };
};

interface I_ProductDetailPageProps {
  dataProduct: null | I_ProductCard;
}

const ProductDetailPage: React.FC<I_ProductDetailPageProps> = (props) => {
  const [activeSize, setActiveSize] = useState(36);

  if (props.dataProduct === null) {
    return <MainWrapper>The product is not found</MainWrapper>;
  }

  const { title, mainImage, images, price, priceDiscounted } =
    props.dataProduct;

  const priceJSX = priceDiscounted ? (
    <div>{priceDiscounted} €</div>
  ) : (
    <div>{price} €</div>
  );

  return (
    <MainWrapper>
      {title}
      <GalleryWithChoice images={[mainImage, ...images]} title={title} />
      <Sizes changeSize={setActiveSize} />
      <InnerWrapper>
        SIZE - {activeSize}
        {priceJSX}
        <Button>Add to cart</Button>
      </InnerWrapper>
    </MainWrapper>
  );
};

export default ProductDetailPage;

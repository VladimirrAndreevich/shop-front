import Image from "next/image";
import { GetServerSideProps } from "next";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import { I_ProductCard, I_ProductRes } from "@/types";
import GalleryWithChoice from "@/components/GalleryWithChoice/GalleryWithChoice";
import { InnerWrapper } from "./styled";
import Sizes from "@/components/Sizes/Sizes";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { getStoreInstance } from "@/store/user-store";
import MainContainer from "@/components/MainContainer/MainContainer";
import {
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Btn from "@/components/Button/Button";

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
  const userStore = getStoreInstance();
  const theme = useTheme();
  const isLargeSmViewport = useMediaQuery(theme.breakpoints.up("sm"));

  const [activeSize, setActiveSize] = useState(36);

  if (props.dataProduct === null) {
    return <MainWrapper>The product is not found</MainWrapper>;
  }

  const { id, title, mainImage, images, price, priceDiscounted } =
    props.dataProduct;

  return (
    <MainWrapper>
      <MainContainer maxWidth="lg" sx={{ py: { lg: 3 } }}>
        {!isLargeSmViewport && (
          <Typography variant="h2" fontSize="40px">
            {title}
          </Typography>
        )}

        <Grid container columnSpacing={{ xs: 3, md: 5, lg: 10 }}>
          <Grid item xs={12} sm={6}>
            <GalleryWithChoice images={[mainImage, ...images]} title={title} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {isLargeSmViewport && (
              <Typography
                variant="h2"
                fontSize={{ xs: "30px", md: "35px", lg: "45px" }}
                mb={{ xs: "10px", md: "15px", lg: "20px" }}
              >
                {title}
              </Typography>
            )}
            <Sizes changeSize={setActiveSize} />
            <InnerWrapper>
              <Stack direction="column">
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "18px", sm: "24px", md: "26px" },
                    fontWeight: "bold",
                  }}
                >
                  SIZE - {activeSize}
                </Typography>
                <Stack direction="row" spacing="10px" alignItems="center">
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: "16px", sm: "20px", md: "24px" },
                    }}
                  >
                    {price} €
                  </Typography>
                  {priceDiscounted && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: "12px", sm: "12px", md: "18px" },
                        color: "#7B7B7B",
                        textDecoration: "line-through",
                      }}
                    >
                      {priceDiscounted} €
                    </Typography>
                  )}
                </Stack>
              </Stack>
              <Btn
                clickHandler={() =>
                  userStore.addItemCart(id, activeSize.toString())
                }
                sx={{
                  py: { sm: "15px" },
                  px: { md: "25px" },
                  fontSize: { md: "16px", lg: "18px" },
                }}
              >
                Add to cart
              </Btn>
            </InnerWrapper>
          </Grid>
        </Grid>
      </MainContainer>
    </MainWrapper>
  );
};

export default observer(ProductDetailPage);

import { E_Type, I_ProductCard, I_ProductsByTypeRes } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import ProductItem from "@/components/ProductItem/ProductItem";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import FilterDrawer from "@/components/FilterDrawer/FilterDrawer";
import { useState } from "react";
import BreadcrumbsComp from "@/BreadcrumbsComp/BreadcrumbsComp";
import { breadcrumbsPaths } from "@/types/path";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: E_Type.sneakers } },
      { params: { type: E_Type.boots } },
      { params: { type: E_Type.slippers } },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CatalogPageProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const type = params.type as E_Type;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/products/by-type?type=${type}`
  );

  const formattedResponse: I_ProductsByTypeRes = await response.json();

  return {
    props: {
      products: formattedResponse.data.products,
      amount: formattedResponse.data.amount,
      typeShoes: type,
    },
    revalidate: 3600,
  };
};

interface CatalogPageProps {
  products: I_ProductCard[];
  amount: number;
  typeShoes: E_Type;
}

const CatalogPage: React.FC<CatalogPageProps> = (props) => {
  const [products, setProducts] = useState(props.products);
  const [amount, setAmount] = useState(props.amount);
  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up("lg"));
  const { typeShoes } = props;

  let titleText: string;
  switch (typeShoes) {
    case E_Type.sneakers:
      titleText = "Sneakers";
      break;
    case E_Type.boots:
      titleText = "Boots";
      break;
    case E_Type.slippers:
      titleText = "Slippers";
      break;

    default:
      titleText = "Shoes";
      break;
  }

  const mainContent = (
    <>
      <Typography variant="h2" fontSize={35}>
        {titleText}
      </Typography>
      <Typography>{amount} products</Typography>

      {!isLargeViewport && (
        <FilterDrawer
          typeShoes={typeShoes}
          setProducts={setProducts}
          setAmount={setAmount}
        />
      )}

      <Grid container spacing="20px" mt={1}>
        {products.map((item, index) => (
          <Grid item xs={6} md={4} key={index}>
            <ProductItem data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  if (isLargeViewport) {
    return (
      <main>
        <MainContainer sx={{ py: { xs: 1 } }}>
          <BreadcrumbsComp crumbs={breadcrumbsPaths.catalog} />

          <Grid container columnSpacing={3}>
            <Grid item lg={3}>
              <FilterDrawer
                typeShoes={typeShoes}
                setProducts={setProducts}
                setAmount={setAmount}
                isLargeViewport={isLargeViewport}
              />
            </Grid>
            <Grid item lg={9}>
              {mainContent}
            </Grid>
          </Grid>
        </MainContainer>
      </main>
    );
  }

  return (
    <main>
      <MainContainer sx={{ py: { xs: 1, md: 3, lg: 4 } }}>
        <BreadcrumbsComp crumbs={breadcrumbsPaths.catalog} />

        {mainContent}
      </MainContainer>
    </main>
  );
};

export default CatalogPage;

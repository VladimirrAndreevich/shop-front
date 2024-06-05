import { E_Type, I_ProductCard, I_ProductsByTypeRes } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import ProductItem from "@/components/ProductItem/ProductItem";
import MainContainer from "@/components/MainContainer/MainContainer";
import {
  Box,
  Grid,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FilterDrawer from "@/components/FilterDrawer/FilterDrawer";
import { ChangeEvent, useState } from "react";
import BreadcrumbsComp from "@/BreadcrumbsComp/BreadcrumbsComp";
import { breadcrumbsPaths } from "@/types/path";
import axios from "axios";
import ProductItemSkeleton from "@/components/ProductItemSkeleton/ProductItemSkeleton";
import colors from "@/consts/colors";

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

const take = 9;

async function getProducts(type: E_Type, skip?: number, take?: number) {
  let additionalQueryParams = "";
  if (skip !== undefined && take !== undefined) {
    additionalQueryParams = `&skip=${skip}&take=${take}`;
  }
  const path = `${process.env.API_URL_BACKEND}/products/by-type?type=${type}${additionalQueryParams}`;
  const formattedResponse: I_ProductsByTypeRes = await axios
    .post(path)
    .then((response) => response.data);

  return {
    products: formattedResponse.data.products,
    amount: formattedResponse.data.amount,
  };
}

export const getStaticProps: GetStaticProps<CatalogPageProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const type = params.type as E_Type;

  const formattedResponse = await getProducts(type, 0, take);

  return {
    props: {
      products: formattedResponse.products,
      amount: formattedResponse.amount,
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
  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up("lg"));
  const { typeShoes } = props;

  const [page, setPage] = useState(1);
  const handleChange = async (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    const skip = value === 1 ? 0 : (value - 1) * take;

    setProducts([]);
    const formattedResponse = await getProducts(typeShoes, skip, take);
    setProducts(formattedResponse.products);
  };

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
      <Typography>{products.length} products</Typography>

      {!isLargeViewport && (
        <FilterDrawer
          take={take}
          skip={page === 1 ? 0 : (page - 1) * take}
          typeShoes={typeShoes}
          setProducts={setProducts}
        />
      )}

      <Grid container spacing="20px" mt={1}>
        {products && products.length > 0
          ? products.map((item, index) => (
              <Grid item xs={6} md={4} key={index}>
                <ProductItem data={item} />
              </Grid>
            ))
          : Array(take)
              .fill(null)
              .map((_, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <ProductItemSkeleton />
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
                take={take}
                skip={page === 1 ? 0 : (page - 1) * take}
                typeShoes={typeShoes}
                setProducts={setProducts}
                isLargeViewport={isLargeViewport}
              />
            </Grid>
            <Grid item lg={9}>
              {mainContent}
            </Grid>
          </Grid>
        </MainContainer>
        <Box display="flex" justifyContent="center" my={1}>
          <Pagination
            shape="rounded"
            count={Math.ceil(props.amount / take)}
            page={page}
            onChange={handleChange}
            sx={{
              ".MuiPaginationItem-root.Mui-selected": {
                color: "white",
                backgroundColor: colors.accent,
              },
            }}
          />
        </Box>
      </main>
    );
  }

  return (
    <main>
      <MainContainer sx={{ py: { xs: 1, md: 3, lg: 4 } }}>
        <BreadcrumbsComp crumbs={breadcrumbsPaths.catalog} />

        {mainContent}
      </MainContainer>
      <Box display="flex" justifyContent="center" my={1}>
        <Pagination
          shape="rounded"
          count={Math.ceil(props.amount / take)}
          page={page}
          onChange={handleChange}
          sx={{
            ".MuiButtonBase-root.MuiPaginationItem-root.Mui-selected": {
              color: "white",
              backgroundColor: colors.accent,
            },
          }}
        />
      </Box>
    </main>
  );
};

export default CatalogPage;

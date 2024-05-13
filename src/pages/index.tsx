import Group from "@/components/Group/Group";
import { MainWrapper } from "@/components/MainWrapper/MainWrapper";
import SwiperProducts from "@/components/SwiperProducts/SwiperProducts";
import { REVALIDATION_TIME_MAIN_PAGE } from "@/consts";
import { E_Type, I_ProductCard, I_ProductsRes } from "@/types";
import Head from "next/head";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Typography } from "@mui/material";

export async function getStaticProps() {
  const response = await fetch(
    process.env.REACT_APP_API_URL + "/products/favorites"
  );
  // TODO add error handling
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`)
  // }

  const products: I_ProductsRes = await response.json();

  const productsList = {
    sneakers: products.data.filter((item) => item.type === E_Type.sneakers),
    boots: products.data.filter((item) => item.type === E_Type.boots),
    slippers: products.data.filter((item) => item.type === E_Type.slippers),
  };

  return {
    props: {
      lists: [
        {
          title: "Sneakers",
          products: productsList.sneakers,
        },
        {
          title: "Boots",
          products: productsList.boots,
        },
        {
          title: "Slippers",
          products: productsList.slippers,
        },
      ],
    },
    revalidate: REVALIDATION_TIME_MAIN_PAGE,
  };
}

interface I_HomePageProps {
  lists: [
    {
      title: string;
      products: I_ProductCard[];
    }
  ];
}

const Home: React.FC<I_HomePageProps> = (props) => {
  return (
    <>
      <Head>
        <title>Main Page</title>
        <meta name="description" content="Main Page of shop" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainWrapper>
        <MainContainer>
          {props.lists.map((list, index) => (
            <Group
              title={list.title}
              type={list.title.toLocaleLowerCase() as E_Type}
              key={index}
            >
              {list.products.length !== 0 ? (
                <SwiperProducts productsList={list.products} />
              ) : (
                // <Message>Empty</Message>
                <Typography
                  variant="h5"
                  component="h5"
                  sx={{
                    textAlign: "center",
                    fontSize: { xs: "20px", md: "24px", lg: "30px" },
                    py: { xs: "15px", md: "30px", lg: "40px" },
                  }}
                >
                  Empty
                </Typography>
              )}
            </Group>
          ))}
        </MainContainer>
      </MainWrapper>
    </>
  );
};

export default Home;

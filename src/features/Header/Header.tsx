import Image from "next/image";
import { getStoreInstance } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Link from "next/link";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Box, Grid, Stack } from "@mui/material";
import colors from "@/consts/colors";

const Header: React.FC = observer(() => {
  const userStore = getStoreInstance();

  useEffect(() => {
    userStore.initToken(localStorage.getItem("token"));
  }, []);

  // return (
  //   <HeaderStyled>
  //     <MainContainer>
  //       <Content>
  //         <div></div>

  //         <LinkLogo href="/">
  //           <Image
  //             src="/logo.svg"
  //             alt="Shop Logo"
  //             width={70}
  //             height={27}
  //             priority
  //           />
  //         </LinkLogo>

  //         <RightContainer>
  //           {!userStore.isLogged && (
  //             <Link href="/user/register">
  //               <Image
  //                 src="/icons/user.svg"
  //                 alt="The icon of a star"
  //                 width={20}
  //                 height={25}
  //                 priority
  //               />
  //             </Link>
  //           )}
  //           {userStore.isLogged && (
  //             <>
  //               <Link href="/user/favorites">
  //                 <Image
  //                   src="/icons/star.svg"
  //                   alt="The icon of a star"
  //                   width={20}
  //                   height={25}
  //                   priority
  //                 />
  //               </Link>
  //               <Link href="/user/cart">
  //                 <Image
  //                   src="/icons/cart.svg"
  //                   alt="The icon of a cart"
  //                   width={20}
  //                   height={25}
  //                   priority
  //                 />
  //               </Link>
  //             </>
  //           )}
  //         </RightContainer>
  //       </Content>
  //     </MainContainer>
  //   </HeaderStyled>
  // );

  return (
    <header style={{ backgroundColor: colors.primary }}>
      <MainContainer>
        <Box
          sx={{
            px: { sm: "20px", md: "30px", lg: "60px", xl: "90px" },
            py: { xs: "26px", lg: "32px" },
          }}
        >
          <Grid container spacing={0}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Box display="flex" justifyContent="center">
                <Link href="/">
                  <Image
                    src="/logo.svg"
                    alt="Shop Logo"
                    width={70}
                    height={27}
                    priority
                  />
                </Link>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" spacing="20px" justifyContent="flex-end">
                {!userStore.isLogged && (
                  <Link href="/user/register">
                    <Image
                      src="/icons/user.svg"
                      alt="The icon of a star"
                      width={20}
                      height={25}
                      priority
                    />
                  </Link>
                )}
                {userStore.isLogged && (
                  <>
                    <Link href="/user/favorites">
                      <Image
                        src="/icons/star.svg"
                        alt="The icon of a star"
                        width={20}
                        height={25}
                        priority
                      />
                    </Link>
                    <Link href="/user/cart">
                      <Image
                        src="/icons/cart.svg"
                        alt="The icon of a cart"
                        width={20}
                        height={25}
                        priority
                      />
                    </Link>
                  </>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </MainContainer>
    </header>
  );
});

export default Header;

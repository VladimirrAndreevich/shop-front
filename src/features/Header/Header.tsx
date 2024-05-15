import Image from "next/image";
import { getStoreInstance } from "@/store/user-store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Link from "next/link";
import MainContainer from "@/components/MainContainer/MainContainer";
import { Badge, Box, Grid, Stack } from "@mui/material";
import colors from "@/consts/colors";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";

const Header: React.FC = observer(() => {
  const userStore = getStoreInstance();
  const router = useRouter();

  useEffect(() => {
    userStore.initToken(localStorage.getItem("token"));
  }, []);

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
              <Stack
                direction="row"
                spacing="20px"
                justifyContent="flex-end"
                alignItems="center"
              >
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
                      {/* <Badge
                        badgeContent={
                          <div>{`${userStore.totalCartItems}`}</div>
                        }
                        color="primary"
                      >
                        <Image
                          src="/icons/cart.svg"
                          alt="The icon of a cart"
                          width={20}
                          height={25}
                          priority
                        />
                      </Badge> */}
                      <Image
                        src="/icons/cart.svg"
                        alt="The icon of a cart"
                        width={20}
                        height={25}
                        priority
                      />
                    </Link>
                    <div
                      onClick={() => {
                        userStore.logout();
                        router.push("/");
                      }}
                    >
                      <LogoutIcon
                        sx={{ color: "white" }}
                        // width={20}
                        // height={25}
                      />
                    </div>
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

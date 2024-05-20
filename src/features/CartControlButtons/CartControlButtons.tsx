import { Button, Stack, ThemeProvider, createTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { getStoreInstance } from "@/store/user-store";
import { LoadingButton } from "@mui/lab";
import { observer } from "mobx-react-lite";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    button: Palette["primary"];
  }

  interface PaletteOptions {
    button?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an button option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

const theme = createTheme({
  palette: {
    button: {
      main: "#121214",
      // light: "#E9DB5D",
      // dark: "#A29415",
      contrastText: "white",
    },
  },
});

const LoadBtn: React.FC<{
  children: React.ReactNode;
  onClickHandler?: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
}> = ({ children, onClickHandler, isSubmitting, disabled }) => {
  return (
    <LoadingButton
      disabled={disabled}
      loading={isSubmitting}
      variant="outlined"
      color="button"
      size="small"
      sx={{
        minWidth: "20px",
        width: { xs: "30px", sm: "35px" },
        height: { xs: "30px", sm: "35px" },
        borderRadius: "50%",
      }}
      onClick={onClickHandler}
    >
      {children}
    </LoadingButton>
  );
};

type CartControlButtonsProps = {
  size: string;
  productId: number;
  children: React.ReactNode | string;
};

const CartControlButtons: React.FC<CartControlButtonsProps> = ({
  size,
  productId,
  children,
}) => {
  const userStore = getStoreInstance();

  let isRemoveButton =
    userStore.isLogged &&
    userStore.cart?.find(
      (item) => item.product.id === productId && item.size === size
    ) !== undefined;

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={1} alignItems="center">
        <LoadBtn
          isSubmitting={userStore.isAddingToCart}
          onClickHandler={() => {
            userStore.addItemCart(productId, size);
          }}
        >
          <AddIcon sx={{ fontSize: "15px" }} />
        </LoadBtn>
        <span>{children}</span>
        <LoadBtn
          disabled={!isRemoveButton}
          isSubmitting={userStore.isRemovingFromCart}
          onClickHandler={() => {
            userStore.removeItemCart(productId, size);
          }}
        >
          <RemoveIcon sx={{ fontSize: "15px" }} />
        </LoadBtn>
      </Stack>
    </ThemeProvider>
  );
};

export default observer(CartControlButtons);

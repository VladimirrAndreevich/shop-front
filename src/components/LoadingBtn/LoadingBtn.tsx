import {
  Button,
  SxProps,
  Theme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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

type ButtonProps = {
  children: string | React.ReactNode;
  clickHandler?: () => void;
  sx?: SxProps<Theme>;
  loading?: boolean;
  disabled?: boolean;
};

const LoadingBtn: React.FC<ButtonProps> = ({
  children,
  clickHandler,
  sx = [],
  loading,
  disabled,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <LoadingButton
        loading={loading}
        disabled={disabled}
        color="button"
        variant="contained"
        onClick={clickHandler}
        sx={[
          {
            p: "10px 20px",
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </LoadingButton>
    </ThemeProvider>
  );
};

export default LoadingBtn;

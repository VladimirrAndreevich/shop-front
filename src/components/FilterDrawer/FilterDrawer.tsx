import {
  Box,
  Button,
  Drawer,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import Btn from "../Btn/Btn";
import FilterByPrice from "@/FilterByPrice/FilterByPrice";
import FilterByColor from "../FilterByColor/FilterByColor";
import { E_Type, I_ProductCard, I_ProductsByTypeRes } from "@/types";
import axios from "axios";

const colors = ["green", "black", "gray", "blue", "yellow", "orange"];

type FilterDrawerProps = {
  typeShoes: E_Type;
  setProducts: Dispatch<SetStateAction<I_ProductCard[]>>;
  isLargeViewport?: boolean;
  skip?: number;
  take?: number;
};

declare module "@mui/material/styles" {
  interface Palette {
    button: Palette["primary"];
    button_reset: Palette["primary"];
  }

  interface PaletteOptions {
    button?: PaletteOptions["primary"];
    button_reset?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
    button_reset: true;
  }
}

const theme = createTheme({
  palette: {
    button: {
      main: "#49D0FF",
      contrastText: "white",
    },
    button_reset: {
      main: "#ffffff",
      contrastText: "black",
    },
  },
});

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  typeShoes,
  setProducts,
  isLargeViewport,
  skip,
  take,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([100, 5000]);
  const [indexColor, setIndexColor] = useState<number | undefined>();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getProductByFilter = async () => {
    const body: {
      min: number;
      max: number;
      color?: string;
    } = { min: value[0], max: value[1] };
    if (indexColor !== undefined) {
      body.color = colors[indexColor];
      // console.log(body);
    }

    let additionalQueryParams = "";
    if (skip !== undefined && take !== undefined) {
      additionalQueryParams = `&skip=${skip}&take=${take}`;
    }
    const path = `${process.env.API_URL_BACKEND}/products/by-type?type=${typeShoes}${additionalQueryParams}`;
    const response: I_ProductsByTypeRes = await axios
      .post(path, body)
      .then((response) => response.data);

    setProducts(response.data.products);

    setOpen(false);
  };

  const reset = async () => {
    setValue([100, 5000]);
    setIndexColor(undefined);

    let additionalQueryParams = "";
    if (skip !== undefined && take !== undefined) {
      additionalQueryParams = `&skip=${skip}&take=${take}`;
    }
    const path = `${process.env.API_URL_BACKEND}/products/by-type?type=${typeShoes}${additionalQueryParams}`;

    const response: I_ProductsByTypeRes = await axios
      .post(path)
      .then((response) => response.data);

    setProducts(response.data.products);

    setProducts(response.data.products);

    setOpen(false);
  };

  const filterContent = (
    <Box sx={{ p: { xs: 3, lg: 0 } }}>
      <FilterByPrice value={value} setValue={setValue} />
      <FilterByColor
        colors={colors}
        setIndexColor={setIndexColor}
        activeIndexColor={indexColor}
      />
      <Stack mt={2}>
        <Button
          variant="contained"
          color="button"
          sx={{ mt: 2 }}
          onClick={() => {
            getProductByFilter();
          }}
        >
          Apply filters
        </Button>
        <Button
          variant="contained"
          color="button_reset"
          sx={{ mt: 2 }}
          onClick={() => {
            reset();
          }}
        >
          Reset filters
        </Button>
      </Stack>
    </Box>
  );

  if (isLargeViewport) {
    return <ThemeProvider theme={theme}>{filterContent}</ThemeProvider>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Btn
          clickHandler={toggleDrawer(true)}
          variant="outlined"
          sx={{ display: "block", mx: { xs: "auto", md: "initial" }, mt: 1 }}
        >
          Open filters
        </Btn>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              maxWidth: { sm: "580px" },
              mx: { xs: "10px", sm: "auto" },
              borderRadius: "5px 5px 0 0",
            },
          }}
        >
          {filterContent}
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default FilterDrawer;

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
};

declare module "@mui/material/styles" {
  interface Palette {
    button: Palette["primary"];
  }

  interface PaletteOptions {
    button?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

const theme = createTheme({
  palette: {
    button: {
      main: "#49D0FF",
      contrastText: "white",
    },
  },
});

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  typeShoes,
  setProducts,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[]>([100, 3000]);
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
    if (indexColor) {
      body.color = colors[indexColor];
      console.log(body);
    }
    const response: I_ProductsByTypeRes = await axios
      .post(
        `${process.env.API_URL_BACKEND}/products/by-type?type=${typeShoes}`,
        body
      )
      .then((response) => response.data);

    setProducts(response.data.products);
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Btn
          clickHandler={toggleDrawer(true)}
          variant="outlined"
          sx={{ display: "block", mx: "auto" }}
        >
          Open filters
        </Btn>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              mx: "10px",
              borderRadius: "5px 5px 0 0",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
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
            </Stack>
          </Box>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

export default FilterDrawer;

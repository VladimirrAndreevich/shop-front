import colors from "@/consts/colors";
import { E_Type } from "@/types";
import { Link, Stack, Typography } from "@mui/material";
import styled from "styled-components";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const GroupWrapper = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 60px;
  }
`;

export const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 15px;
`;

export const Price = styled.p<{ $discounted?: boolean }>`
  text-decoration: ${(props) => (props.$discounted ? "line-through" : "")};
`;

export const HeadingTypography: React.FC<{
  children: React.ReactNode | string;
}> = ({ children }) => {
  return (
    <Typography
      variant="h3"
      component="h3"
      sx={{
        fontSize: { xs: "19px", sm: "25px", lg: "31px" },
        fontWeight: "bold",
        textTransform: "uppercase",
      }}
    >
      {children}
    </Typography>
  );
};

export const MoreButton: React.FC<{
  children: React.ReactNode | string;
  type: E_Type;
}> = ({ children, type }) => {
  return (
    <Link
      href={`/products/catalog/${type}`}
      sx={{
        fontSize: { xs: "12px", sm: "14" },
        fontWeight: "bold",
        textDecoration: "none",
        color: colors.primary,
        textTransform: "uppercase",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{ borderBottom: "1px solid black" }}
      >
        {children}
        <KeyboardArrowRightIcon
          sx={{ transform: "translateX(8px)", marginLeft: "-8px" }}
        />
      </Stack>
    </Link>
  );
};

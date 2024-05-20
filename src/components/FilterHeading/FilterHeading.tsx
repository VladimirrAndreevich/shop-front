import { Typography } from "@mui/material";

type FilterHeadingProps = {
  children: React.ReactNode | string;
};

const FilterHeading: React.FC<FilterHeadingProps> = ({ children }) => {
  return (
    <Typography variant="h3" fontSize={25}>
      {children}
    </Typography>
  );
};

export default FilterHeading;

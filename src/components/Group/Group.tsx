import Link from "next/link";
import {
  GroupHeader,
  GroupWrapper,
  HeadingTypography,
  MoreButton,
} from "./styled";
import { E_Type } from "@/types";
import { useMediaQuery, useTheme } from "@mui/material";

interface I_GroupProps {
  title: string;
  type: E_Type;
  children: React.ReactElement;
}

const Group: React.FC<I_GroupProps> = ({ title, type, children }) => {
  const theme = useTheme();
  const isLargeViewport = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <GroupWrapper>
      <GroupHeader>
        <HeadingTypography>{title}</HeadingTypography>
        <MoreButton type={type}>
          More {isLargeViewport && `products`}
        </MoreButton>
      </GroupHeader>
      {children}
    </GroupWrapper>
  );
};

export default Group;

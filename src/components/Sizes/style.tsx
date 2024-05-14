import colors from "@/consts/colors";
import { Grid } from "@mui/material";
import styled from "styled-components";

// export const Heading = styled.h2`
//   margin-top: 30px;
// `;

export const SizesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 13px;
  margin-top: 13px;

  list-style: none;
`;

export const SizesItem = styled.li<{ $active?: boolean }>`
  padding: 8px;
  border-radius: 4px;

  text-align: center;
  background-color: ${(props) =>
    props.$active ? colors.accent : "transparent"};
  color: ${(props) => (props.$active ? "white" : "black")};
`;

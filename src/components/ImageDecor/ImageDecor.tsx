import colors from "@/consts/colors";
import styled from "styled-components";

export const ImageDecor = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    width: 74px;
    height: 74px;
    border-radius: 50%;
    z-index: -1;
    transform: translateY(6px);

    background-color: ${colors.accent};
  }
`;

import styled from "styled-components";

export const MainImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 285px;
`;

export const AdditionalImagesWrapper = styled.div<{ $amount?: number }>`
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(${(props) => props.$amount}, 1fr);
  grid-template-rows: 100px;

  margin-top: 12px;
`;

export const AdditionalImageBox = styled.div`
  position: relative;
`;

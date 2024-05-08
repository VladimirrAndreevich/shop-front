import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Heading, SizesItem, SizesList } from "./style";

const sizes = {
  start: 36,
  end: 44.5,
};

type SizesProps = {
  changeSize: Dispatch<SetStateAction<number>>;
};

const Sizes: React.FC<SizesProps> = ({ changeSize }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  let sizesList: number[] = [];

  for (let i = sizes.start; i <= sizes.end; i += 0.5) {
    sizesList.push(i);
  }

  useEffect(() => {
    changeSize(sizesList[activeIndex]);
  }, [activeIndex]);

  return (
    <>
      <Heading>EU sizes:</Heading>
      <SizesList>
        {sizesList.map((item, index) => (
          <SizesItem
            key={index}
            onClick={() => setActiveIndex(index)}
            $active={index === activeIndex}
          >
            {item}
          </SizesItem>
        ))}
      </SizesList>
    </>
  );
};

export default Sizes;

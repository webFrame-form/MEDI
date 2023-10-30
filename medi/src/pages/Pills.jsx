import React, { useState, useEffect } from 'react';
import colors from "../styles/colors";
import styled from "styled-components";
import Banner1 from "../assets/images/Banner1.png";
import Banner2 from "../assets/images/Banner2.png";
import Banner3 from "../assets/images/Banner3.png";
import buttonLeft from "../assets/images/ButtonLeft.png";
import buttonRight from "../assets/images/ButtonRight.png";

const PillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const First= styled.div`
  width: 54.5vw;
  margin-top: 2vw;
  display: flex;
  justify-content: center;
`;

const PillsSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${colors.lightgray};
`;

const SearchInput = styled.input`
  width: 25vw;
  height: 3vw;
  font-size: 1vw;
  border: 0.2vw solid #2A2A3A;
  border-radius: 1.5vw;
  background: #191B24;
  color: ${colors.white};
  outline: none;
  padding: 0.5vw 2vw 0.5vw 2vw;
`;

const Select = styled.select`
  width: 100% 
  align-items: center;
  justify-content: center;
  font-size: 1vw;
  padding: 0.5vw 2vw 0.5vw 2vw;
  height: 3vw;
  border: 0.2vw solid #2A2A3A;
  border-radius: 1.5vw;
  background: #191B24;
  color: #484A64;
`;

//배너
const Slides = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0.4vw;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const PillsBannerContainer = styled.div`
  width: 59vw;
  height: 8.5vw;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.6vw;
  margin-bottom: 1rem;
  gap: 1vw;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.4vw;
`;

//양쪽 버튼
const Button = styled.img`
  width: 1.2vw;
  height: 1.2vw;
  cursor: pointer;
`;

const ButtonLeftStyled = styled(Button)`
`;

const ButtonRightStyled = styled(Button)`
`;

//배너 밑 동그라미 3개
const CircleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5vw;
`;

const Circle = styled.div`
  width: 0.5vw;
  height: 0.5vw;
  background: #191B24;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 0.25vw;
  transition: background-color 0.3s;

  &.active {
    background: #484A64;
  }
`;


const Pills = () => {

  //필터링
  const OPTIONS = [
    { value: "age", name: "나이" },
    { value: "child", name: "어린이" },
    { value: "Teenager", name: "청소년" },
    { value: "adult", name: "성인" },
    { value: "old", name: "중년/노년" },
    { value: "pregnant", name: "임산부" },
  ];

  const OPTIONSS = [
    { value: "Usage", name: "용도" },
    { value: "tired", name: "피로회복" },
    { value: "eye", name: "눈 건강" },
    { value: "bone", name: "뼈 건강" },
    { value: "detox", name: "해독 작용" },
    { value: "medicine", name: "의약품" },
    { value: "nutrients", name: "영양소 보충" },
  ];


  const SelectBox = ({ options, defaultValue, onChange }) => {
    return (
      <Select defaultValue={defaultValue} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>
    );
  };


  //배너
  const images = [Banner1, Banner2, Banner3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlideChange = (direction) => {
    let newIndex = currentSlide + direction;

    if (newIndex < 0) {
      newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
      newIndex = 0;
    }

    setCurrentSlide(newIndex);
  }

  useEffect(() => {
    const autoSlideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        let newIndex = prevSlide + 1;

        if (newIndex >= images.length) {
          newIndex = 0;
        }

        return newIndex;
      });
    }, 3000);

    return () => {
      clearInterval(autoSlideTimer);
    };
  }, [images.length]);




  return (
    <PillsContainer>
      <First>
      <PillsSearch>
        <SearchInput type="search" placeholder="약품을 검색하세요." />
        <SelectBox options={OPTIONS}> </SelectBox> 
        <SelectBox options={OPTIONSS}> </SelectBox> 
      </PillsSearch>
      </First>

      <Banner>
        <PillsBannerContainer>
          <ButtonLeftStyled src={buttonLeft} onClick={() => handleSlideChange(-1)} alt="ButtonLeft" />
          <Slides>
          <StyledImage src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} id="productImage" />
          </Slides>
          <ButtonRightStyled src={buttonRight} onClick={() => handleSlideChange(1)} alt="ButtonRight" />
        </PillsBannerContainer>
        <CircleContainer>
          {[0, 1, 2].map((circleIndex) => (
            <Circle
              key={circleIndex}
              className={currentSlide === circleIndex ? 'active' : ''}
              onClick={() => setCurrentSlide(circleIndex)}
            />
          ))}
        </CircleContainer>
      </Banner>



    </PillsContainer>
  );
}

export default Pills;
import React, { useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";

// 전체 틀 스타일
const StyleItem = styled.div`
  width: 100%;
  min-height: 16vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-top: 5vw;

  @media screen and (max-width: 600px) {
    min-height: 21vw;
  }
`;

//모달 상자
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 90%;
    height: 10vw;
    margin: 1vw 0 1vw 0;

    @media (max-width: 600px) {
      height: 12vw;
    }
  }
  &:hover img {
    transform: scale(1.5);
  }
`;

// 각 아이템을 감싸는 틀
const ItemContainer = styled.div`
  display: flex;
  margin-top: 10px;
  flex: 0 0 12.5%;
  box-sizing: border-box;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  text-align: left;

  &:hover {
    .MovieDetail {
      display: block;
    }
    ${ImageContainer} img {
      transform: scale(1.5);
    }
  }

  img {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 600px) {
      height: 17vw;
    }
  }
`;

// 아이템 정보를 나타내는 문단
const StyledParagraph = styled.p`
  color: ${colors.white};
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px;
  cursor: pointer;

  .company {
    font-size: 1.5rem;
  }

  .name {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem; 

    .company {
      font-size: 1rem; 
    }

    .name {
      font-size: 1.5rem; 
    }
  }
`;



// 모달 스타일
export const PillsModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  color: ${colors.black};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  text-align: left;
  z-index: 999;
  letter-spacing: 2px;
  font-size: 2rem;

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    padding: 2rem;
  }

  .close-button {
    position: absolute;
    background-color: ${colors.lightgray};
    top: 10px;
    right: 10px;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 4rem;
    
    @media screen and (max-width: 600px) {
      .close-button {
        padding: 5px 10px;
        font-size: 2rem;
      }
  }
`;

// 이미지를 나타내는 부분
const ResponsiveImage = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    max-width: 15%;
    height: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
`;

// 모달을 덮는 배경
const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

// 각각의 약품을 나타내는 컴포넌트
const DrugListItem = (props) => {
  const {
    id,
    img,
    company,
    name,
    modalExplain,
    modalImage1,
    modalImage2,
    modalImage3,
    modalImage4,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //마침표를 기준으로 문단 나누기
  const formattedModalExplain = modalExplain
    .split(".")
    .map((paragraph, index, array) => (
      <p key={index}>
        {index === array.length - 1 ? paragraph.trim() : paragraph.trim() + "."}
      </p>
    ));

  return (
    <StyleItem key={id}>
      <ImageContainer onClick={openModal}>
        <img src={img} alt="drug" />
      </ImageContainer>
      <ItemContainer>
        <StyledParagraph>
          <span className="company">{company}</span>
          <br></br>
          <span className="name">{name}</span>
        </StyledParagraph>
      </ItemContainer>
      {isModalOpen && (
        <>
          <PillsModal>
            <h4 style={{ fontSize: "3rem", fontWeight: "bold" }}>{name}</h4>
            <p style={{ fontWeight: "bold" }}>{formattedModalExplain}</p>
            <br />
            <ResponsiveImage>
              <img src={modalImage1} alt="food" />
              <img src={modalImage2} alt="food" />
              <img src={modalImage3} alt="food" />
              <img src={modalImage4} alt="food" />
            </ResponsiveImage>
            <br />
            <button className="close-button" onClick={closeModal}>
              ✖
            </button>
          </PillsModal>
          <StyledOverlay onClick={closeModal} />
        </>
      )}
    </StyleItem>
  );
};

export default DrugListItem;

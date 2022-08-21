import styled from "styled-components";

import { BannerChar } from "assets/svgs";
import BannerPattern from "assets/svgs/banner_pattern.svg";

const Banner = () => {
  return (
    <BannerContainer>
      <BannerChar />
    </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 239.56px;
  background-image: url(${BannerPattern});
  background-position: center;
  background-size: cover;

  svg {
    position: absolute;
    top: 47px;
    width: 100%;
    height: 193.37px;
  }

  @media only screen and (min-width: 600px) {
    height: 299px;

    svg {
      top: 0;
      left: 50%;
      width: 560px;
      height: 300px;
      transform: translate(-50%, 0);
    }
  }

  @media only screen and (min-width: 1025px) {
    height: 299.45px;
  }
`;

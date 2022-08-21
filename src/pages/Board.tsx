import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

import Banner from "components/Banner";
import Search from "components/Search";
import Filter from "components/Filter";
import UserList, { filteredUserListState } from "components/UserList";
import Pagination from "components/Pagination";

const Board = () => {
  const filteredUserList = useRecoilValue(filteredUserListState);

  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);

  const offset = (page - 1) * limit;
  const offsetLimit = offset + limit;

  useEffect(() => {
    setPage(1);
  }, [filteredUserList]);

  return (
    <Container>
      <Banner />
      <div className="content_wrapper">
        <h1 className="title">화섬 아파트 지구家 입주민들</h1>
        <p className="greeting">
          화섬 아파트에 입주한 입주민들입니다.
          <br />
          같이 화성에 가는날을 기다리며 화목하게 지내봐요!
        </p>

        <Search />
        <Filter />
        <UserList offset={offset} offsetLimit={offsetLimit} />
        <Pagination
          total={filteredUserList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </Container>
  );
};

export default Board;

const Container = styled.main`
  .content_wrapper {
    padding: 0 20px;

    @media only screen and (min-width: 600px) {
      width: 560px;
      padding: 0;
      margin: 0 auto;
    }

    .title {
      width: 311px;
      height: 36px;
      padding-top: 47.63px;
      margin: 0 auto;
      font-weight: 700;
      font-size: 28px;
      line-height: 36px;
      text-align: center;
      letter-spacing: -0.05em;

      @media only screen and (min-width: 600px) {
        width: 444px;
        height: 56px;
        padding-top: 49px;
        font-size: 40px;
        line-height: 56px;
      }
    }

    .greeting {
      width: 320px;
      height: 48px;
      padding-top: 20px;
      margin: 0 auto;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
      letter-spacing: -0.05em;

      @media only screen and (min-width: 600px) {
        width: 313px;
      }
    }
  }
`;

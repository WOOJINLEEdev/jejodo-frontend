import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import {
  LeftFirstArrow,
  LeftSecondArrow,
  RightFirstArrow,
  RightSecondArrow,
} from "assets/svgs";

interface IPaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({ total, limit, page, setPage }: IPaginationProps) => {
  const numPages = Math.ceil(total / limit);

  return (
    <PaginationContainer>
      <Button
        type="button"
        onClick={() => setPage(1)}
        disabled={page === 1}
        aria-label="첫 페이지로 가기"
      >
        <LeftFirstArrow />
      </Button>
      <Button
        type="button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지로 가기"
      >
        <LeftSecondArrow />
      </Button>

      <div className="page_btn_wrapper">
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => (
            <Button
              key={`page_button_${i + 1}`}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : undefined}
              className="page_btn"
            >
              {i + 1}
            </Button>
          ))}
      </div>

      <Button
        type="button"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        aria-label="다음 페이지로 가기"
      >
        <RightFirstArrow />
      </Button>
      <Button
        type="button"
        onClick={() => setPage(numPages)}
        disabled={page === numPages}
        aria-label="마지막 페이지로 가기"
      >
        <RightSecondArrow />
      </Button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 44px auto 100px;

  .page_btn_wrapper {
    display: flex;
    margin: 0 12px;
  }
`;

interface IButtonProps {
  disabled?: boolean;
  ["aria-current"]?: "page";
}

const Button = styled.button<IButtonProps>`
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  color: rgba(0, 0, 0, 0.5);
  background: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;

  path,
  rect {
    stroke: #000000;
  }

  path {
    fill: #000000;
  }

  &[disabled] {
    & path,
    rect {
      stroke: #999999;
    }

    & path {
      fill: #999999;
    }
  }

  &[aria-current] {
    color: #000000;
    font-weight: bold;
  }

  &.page_btn {
    width: 7px;
    height: 16px;

    & + & {
      margin-left: 12px;
    }
  }
`;

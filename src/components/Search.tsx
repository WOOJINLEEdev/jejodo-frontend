import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";
import {
  atom,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { userListState } from "components/UserList";

import { SearchIcon } from "assets/svgs";

const keywordListState = selectorFamily<string[], string>({
  key: "#keywordListState",
  get:
    (searchKeyword) =>
    ({ get }) => {
      const userList = get(userListState);
      const keywordSet = new Set<string>();

      userList.forEach((user) => {
        keywordSet.add(user.oname);
        keywordSet.add(user.nickname);
      });

      return Array.from(keywordSet).filter(
        (keyword) =>
          searchKeyword &&
          keyword.toUpperCase().includes(searchKeyword.toUpperCase())
      );
    },
});

export const selectedKeywordState = atom({
  key: "#selectedKeywordState",
  default: "",
});

const Search = () => {
  const [search, setSearch] = useState("");

  const keywordList = useRecoilValue(keywordListState(search));
  const setSelectedKeyword = useSetRecoilState(selectedKeywordState);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleResultItemClick = (result: string) => {
    setSelectedKeyword(result);
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleFormSubmit}>
        <label htmlFor="searchInput" className="visually_hidden">
          검색
        </label>
        <input
          type="text"
          className="search_input"
          id="searchInput"
          placeholder="검색"
          value={search}
          onChange={handleSearchChange}
        />

        <button type="submit" className="submit_btn" aria-label="검색 버튼">
          <SearchIcon />
        </button>
      </Form>

      {keywordList.length > 0 && (
        <div className="search_result">
          {keywordList.map((keyword, i) => {
            return (
              <div
                key={`result_item_${i}`}
                className="result_item"
                role="button"
                onClick={() => handleResultItemClick(keyword)}
              >
                <span className="result_text">{keyword}</span>
              </div>
            );
          })}
        </div>
      )}
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 100%;
  margin: 0 auto;

  .search_result {
    z-index: 2;
    position: absolute;
    top: 20px;
    left: 0;
    width: calc(100% - 2px);
    max-width: 400px;
    padding: 16px 0 8px;
    border: 1px solid #000000;
    border-top: 0;
    border-radius: 0px 0px 15px 15px;
    background: #ffffff;

    .result_item {
      width: calc(100% - 27px);
      margin: 0 3px;
      padding-left: 21px;
      height: 36px;
      cursor: pointer;

      .result_text {
        display: inline-block;
        height: 20px;
        padding: 8px 0;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.05em;
      }

      @media (hover: hover) {
        &:hover {
          background: #eeeeee;
        }
      }
    }
  }
`;

const Form = styled.form`
  z-index: 3;
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100% - 26px);
  max-width: 374px;
  height: 30px;
  padding-left: 24px;
  margin: 48px auto 0;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 20px;

  .search_input {
    width: 100%;
    min-height: 100%;
    padding: 0;
    border: 0;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 14px;
    outline: 0;

    &::placeholder {
      width: 26px;
      height: 20px;
      font-family: "Noto Sans KR";
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.05em;
      color: #999999;
    }
  }

  .submit_btn {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0;
    border: 0;
    background: transparent;

    svg {
      padding: 0 12px;
    }
  }
`;

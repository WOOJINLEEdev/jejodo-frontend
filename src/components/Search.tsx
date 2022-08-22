import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
} from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLUListElement>(null);

  const keywordList = useRecoilValue(keywordListState(search));
  const setSelectedKeyword = useSetRecoilState(selectedKeywordState);

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      setSelectedKeyword(search);
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setIsOpen(true);
  };

  const handleResultItemClick = (result: string) => {
    setSelectedKeyword(result);
    setSearch(result);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (!searchRef?.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleSearchKeyUp = (e: KeyboardEvent) => {
    if (keywordList.length > 0) {
      switch (e.key) {
        case "ArrowDown":
          setIndex(index + 1);
          if (resultRef.current?.childElementCount === index + 1) setIndex(0);
          break;
        case "ArrowUp":
          setIndex(index - 1);
          if (index <= 0) {
            setIndex(-1);
          }
          break;
        case "Escape":
          setIndex(-1);
          break;
        case "Enter":
          if (index >= 0) {
            setSelectedKeyword(keywordList[index]);
            setSearch(keywordList[index]);
            searchRef?.current?.blur();
            setIsOpen(false);
            setIndex(-1);
          }
          break;
      }
    }
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleFormSubmit}>
        <label htmlFor="searchInput" className="visually_hidden">
          검색
        </label>
        <input
          type="text"
          id="searchInput"
          className="search_input"
          placeholder="검색"
          value={search}
          ref={searchRef}
          onChange={handleSearchChange}
          onKeyUp={handleSearchKeyUp}
        />

        <button type="submit" className="submit_btn" aria-label="검색 버튼">
          <SearchIcon />
        </button>
      </Form>

      {isOpen && keywordList.length > 0 && (
        <ul className="search_result" ref={resultRef}>
          {keywordList.map((keyword, i) => {
            return (
              <li
                key={`result_item_${i}`}
                className={index === i ? "result_item is_focus" : "result_item"}
                role="button"
                onClick={() => handleResultItemClick(keyword)}
              >
                <span className="result_text">{keyword}</span>
              </li>
            );
          })}
        </ul>
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

      &.is_focus {
        background: #eeeeee;
      }

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

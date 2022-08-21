import { useState, MouseEvent } from "react";
import styled from "styled-components";
import { atom, useSetRecoilState } from "recoil";

import { FilterIcon } from "assets/svgs";

const TABS = ["전체", "5개 이상", "4개", "3개", "2개", "1개"];

export const filterState = atom({
  key: "#filterState",
  default: TABS[0],
});

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const setFilterState = useSetRecoilState(filterState);

  const handleFilterBtnClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleTabBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setCurrentTab(e.currentTarget.value);
    setFilterState(e.currentTarget.value);
  };

  return (
    <FilterContainer>
      <MenuWrapper>
        <div>
          <button
            type="button"
            className={isOpen ? "menu_item hidden" : "menu_item"}
          >
            <span className="menu_item_text">입주민들</span>
            <span className="menu_item_number">472</span>
          </button>
          <button
            type="button"
            className={isOpen ? "menu_item_second" : "menu_item_second hidden"}
          >
            <span className="item_text">화섬 아파트 NFT</span>
          </button>
        </div>

        <button
          type="button"
          className={isOpen ? "filter_btn active" : "filter_btn"}
          onClick={handleFilterBtnClick}
          aria-label="필터 버튼"
        >
          <FilterIcon />
        </button>
      </MenuWrapper>

      {isOpen && (
        <div className="tab_wrapper">
          <span className="tab_title">보유 아파트</span>

          {TABS.map((tab, i) => {
            return (
              <button
                key={`tab_item_${i}`}
                type="button"
                className={currentTab === tab ? "tab_btn is_active" : "tab_btn"}
                onClick={handleTabBtnClick}
                value={tab}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  .tab_wrapper {
    width: calc(100% - 24px);
    background: #ffffff;
    padding: 24px 12px 0;

    .tab_title {
      width: 74px;
      height: 24px;
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.05em;
      margin-right: 24px;
    }

    .tab_btn {
      min-height: 20px;
      padding: 4px 12px;
      color: #999999;
      border: 0;
      background: transparent;
      font-family: "Noto Sans KR";
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.05em;

      &.is_active {
        padding: 4px 12px;
        color: #ffffff;
        background: #000000;
        border-radius: 20px;
      }

      @media (hover: hover) {
        &:hover {
          font-weight: 700;
          line-height: 20px;
          color: #000000;
        }

        &.is_active:hover {
          padding: 4px 12px;
          border-radius: 20px;
          background: #000000;
          color: #ffffff;
          font-weight: 500;
        }
      }
    }

    .tab_btn + .tab_btn {
      margin-left: 12px;
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #000000;
  margin-top: 56px;

  .menu_item {
    padding: 6px 16px;
    margin: 0;
    min-width: 110px;
    background: #000000;
    border: 0;
    border-radius: 10px 10px 0 0;
    color: #ffffff;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.05em;

    &.hidden {
      display: none;
    }

    .menu_item_text {
      display: inline-block;
      width: 50px;
      letter-spacing: -0.05em;
    }

    .menu_item_number {
      display: inline-block;
      width: 24px;
      color: #4498f2;
      margin-left: 4px;
    }
  }

  .menu_item_second {
    padding: 6px 16px;
    color: #ffffff;
    background: #000000;
    border: 0;
    border-radius: 10px 10px 0 0;
    font-family: "Noto Sans KR";
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;

    &.hidden {
      display: none;
    }

    .item_text {
      display: inline-block;
      min-width: 92px;
      height: 20px;
      letter-spacing: -0.05em;
    }
  }

  .filter_btn {
    width: 20px;
    height: 20px;
    border: 0;
    padding: 0;
    background: transparent;

    &.active {
      rect {
        fill: #000000;
      }
      path {
        fill: #000000;
        stroke: #ffffff;
      }
    }

    @media (hover: hover) {
      &:hover {
        rect {
          fill: #000000;
          transition: fill 0.2s ease-in-out 0s;
        }

        path {
          fill: #000000;
          stroke: #ffffff;
          transition: fill 0.2s ease-in-out 0s, stroke 0.2s ease-in-out 0s;
        }
      }
    }
  }
`;

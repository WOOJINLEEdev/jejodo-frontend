import { useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import dompurify from "dompurify";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { filterState } from "components/Filter";
import { selectedKeywordState } from "components/Search";

import { User1, User2, User3, User4, User5, User6, User7 } from "assets/svgs";

interface IUser {
  nickname: string;
  oname: string;
  building_count: number;
}

interface IUserListProps {
  offset: number;
  offsetLimit: number;
}

export const userListState = atom<IUser[]>({
  key: "#userListState",
  default: [],
});

export const filteredUserListState = selector({
  key: "#filteredUserListState",
  get: ({ get }) => {
    const filter = get(filterState);
    const userList = get(userListState);
    const selectedKeyword = get(selectedKeywordState);

    let filteredUserList;
    switch (filter) {
      case "5개 이상":
        filteredUserList = userList.filter((user) => user.building_count >= 5);
        break;
      case "4개":
        filteredUserList = userList.filter((user) => user.building_count === 4);
        break;
      case "3개":
        filteredUserList = userList.filter((user) => user.building_count === 3);
        break;
      case "2개":
        filteredUserList = userList.filter((user) => user.building_count === 2);
        break;
      case "1개":
        filteredUserList = userList.filter((user) => user.building_count === 1);
        break;
      default:
        filteredUserList = userList;
    }

    if (!selectedKeyword) {
      return filteredUserList;
    }

    return filteredUserList.filter(
      (user) =>
        user.nickname.toLowerCase().includes(selectedKeyword.toLowerCase()) ||
        user.oname.toLowerCase().includes(selectedKeyword.toLowerCase())
    );
  },
});

const UserList = ({ offset, offsetLimit }: IUserListProps) => {
  const [userList, setUserList] = useRecoilState(userListState);
  const filteredUserList = useRecoilValue(filteredUserListState);
  const selectedKeyword = useRecoilValue(selectedKeywordState);

  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/jejodo-dev-team/open-api/main/frontend.json"
      )
      .then((res) => {
        setUserList(res.data);
      });
  }, []);

  if (userList.length === 0) return <div>loading...</div>;

  function getUserImage(userName: string) {
    switch (userName) {
      case "차차":
        return <User1 />;
      case "공인즙개사":
        return <User2 />;
      case "AI":
        return <User3 />;
      case "소잃고뇌약간고침":
        return <User4 />;
      case "성희":
        return <User5 />;
      case "목하":
        return <User6 />;
      case "이름":
        return <User7 />;
      default:
        return <User7 />;
    }
  }

  function getHighlightedSearchHtml(name: string, keyword: string) {
    const regex = new RegExp(keyword, "gi");

    return name.replaceAll(
      regex,
      `<mark className="highlight">${keyword.toLowerCase()}</mark>`
    );
  }

  return (
    <UserListContainer>
      {filteredUserList.slice(offset, offsetLimit).map((item, i) => {
        return (
          <ListItem key={`user_${i}`}>
            {getUserImage(item.nickname)}
            <div className="user_info">
              <div className="info_top_wrapper">
                <pre
                  className="nickname"
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(
                      getHighlightedSearchHtml(item.nickname, selectedKeyword)
                    ),
                  }}
                />

                <span className="building_count">
                  지구家 아파트 {item.building_count}개
                </span>
              </div>

              <div className="info_bottom_wrapper">
                <div className="name_wrap">
                  <span className="name_icon">제</span>
                  <pre
                    className="name"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(
                        getHighlightedSearchHtml(item.nickname, selectedKeyword)
                      ),
                    }}
                  />
                </div>
                <div className="name_wrap">
                  <span className="name_icon oname">오</span>
                  <pre
                    className="name"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(
                        getHighlightedSearchHtml(item.oname, selectedKeyword)
                      ),
                    }}
                  />
                </div>
              </div>
            </div>
          </ListItem>
        );
      })}
    </UserListContainer>
  );
};

export default UserList;

const UserListContainer = styled.ul`
  margin-top: 24px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: calc(100% - 50px);
  padding: 16px 24px;
  border: 1px solid #000000;
  border-radius: 10px;
  margin-bottom: 16px;
  letter-spacing: -0.05em;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    min-width: 60px;
  }

  .user_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: calc(100% - 36px);
    padding-left: 20px;

    .info_top_wrapper {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      font-weight: 700;

      .nickname {
        height: 26px;
        margin-right: 12px;
        line-height: 26px;
        font-size: 18px;
        letter-spacing: -0.05em;
        margin-bottom: 4px;
      }

      .building_count {
        height: 20px;
        line-height: 18px;
        color: #4498f2;
        font-size: 14px;
        letter-spacing: -0.05em;
      }
    }

    .info_bottom_wrapper {
      display: flex;
      font-size: 12px;
      line-height: 16px;

      .name_wrap {
        display: flex;
        padding-top: 12px;
      }

      .name_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        margin-right: 4px;
        border: 0.7px solid #000000;
        border-radius: 10px;
        background: #ffdc3c;
        font-size: 8px;
        font-weight: 700;
        line-height: 16px;
      }

      .name {
        color: #999999;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: -0.05em;
      }

      .oname {
        margin-left: 12px;
        background: #4498f2;
      }
    }
  }
`;

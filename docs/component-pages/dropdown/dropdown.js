import { createDropdownMenu } from "../../components/dropdown/create-dropdown.js";
import { initializeDropdowns } from "../../components/dropdown/dropdown-init.js";
import { initializeDropdownSearch } from "../../components/dropdown/dropdown-search.js";
import "../../components/dropdown/dropdown.scss";
import "./dropdown.scss";

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================
     Basic (리스트)
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `basic-menu-${size}`,
      size,
      items: ["옵션 1", "옵션 2", "옵션 3"],
    });
  });

  /* ==========================
     Leading Icon
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `leading-icon-menu-${size}`,
      size,
      items: [
        { title: "옵션 1", leadingIcon: "icon--edit" },
        { title: "옵션 2", leadingIcon: "icon--edit" },
        { title: "옵션 3", leadingIcon: "icon--edit" },
      ],
    });
  });

  /* ==========================
     Tailing Icon
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `tailing-icon-menu-${size}`,
      size,
      items: [
        {
          title: "옵션 1",
          tailingIcon: "icon--caret-right",
          action: () => alert("🖐️"),
        },
        {
          title: "옵션 2",
          tailingIcon: "icon--caret-right",
          action: () => alert("🖐️"),
        },
        {
          title: "옵션 3",
          tailingIcon: "icon--caret-right",
          action: () => alert("🖐️"),
        },
      ],
    });
  });

  /* ==========================
     Checkbox
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `checkbox-menu-${size}`,
      size,
      withCheckbox: true,
      items: ["옵션 1", "옵션 2", "옵션 3"].map((t) => ({ title: t })),
    });
  });

  /* ==========================
     Avatar
     ========================== */
  const avatarItems = [
    { title: "김민수", avatar: "../../assets/images/user.jpg" },
    { title: "김정아", avatar: "../../assets/images/user.jpg" },
    { title: "김태형", avatar: "../../assets/images/user.jpg" },
  ];

  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `avatar-menu-${size}`,
      size,
      withAvatar: true,
      items: avatarItems,
    });
  });

  /* ==========================
     Avatar + sub
     ========================== */
  const avatarSubItems = [
    {
      title: "김민수",
      subtitle: "010-5774-7421",
      avatar: "../../assets/images/user.jpg",
    },
    {
      title: "김정아",
      subtitle: "010-7825-1683",
      avatar: "../../assets/images/user.jpg",
    },
    {
      title: "김태형",
      subtitle: "010-3658-5442",
      avatar: "../../assets/images/user.jpg",
    },
  ];

  ["normal", "small", "xs"].forEach((size) => {
    createDropdownMenu({
      id: `avatar-sub-menu-${size}`,
      size,
      withAvatar: true,
      items: avatarSubItems,
    });
  });

  /* ==========================
     Avatar + Checkbox
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    const menu = createDropdownMenu({
      id: `avatar-chk-menu-${size}`,
      size,
      withAvatar: true,
      withCheckbox: true,
      items: avatarItems,
    });
    initializeDropdownSearch(menu);
  });

  /* ==========================
     Search
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    const menu = createDropdownMenu({
      id: `search-menu-${size}`,
      size,
      withSearch: true,
      items: ["김민수", "김정아", "김태형"].map((t) => ({ title: t })),
    });
    initializeDropdownSearch(menu);
  });

  /* ==========================
     Search + Avatar
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    const menu = createDropdownMenu({
      id: `search-avatar-menu-${size}`,
      size,
      withSearch: true,
      withAvatar: true,
      items: avatarItems,
      unit: "명",
    });
    initializeDropdownSearch(menu);
  });

  /* ==========================
     Search + Avatar + Checkbox
     ========================== */
  ["normal", "small", "xs"].forEach((size) => {
    const menu = createDropdownMenu({
      id: `search-avatar-chk-menu-${size}`,
      size,
      withSearch: true,
      withAvatar: true,
      withCheckbox: true,
      items: avatarItems,
      unit: "명",
    });
    initializeDropdownSearch(menu);
  });

  /* ==========================
     사용 예시
     ========================== */
  createDropdownMenu({
    id: "demo-more-menu",
    size: "xs",
    items: [
      { title: "옵션 1", action: () => alert("🔔 옵션 1 실행") },
      { title: "옵션 2", action: () => alert("🔔 옵션 2 실행") },
      { title: "옵션 3", action: () => alert("🔔 옵션 3 실행") },
    ],
  });

  createDropdownMenu({
    id: "demo-avatar-action-menu",
    size: "small",
    items: [
      {
        title: "정보 수정",
        leadingIcon: "icon--edit",
        action: () => alert("✒️ 정보 수정"),
      },
      {
        title: "로그아웃",
        leadingIcon: "icon--sign-out",
        action: () => alert("🖐️ 로그아웃"),
      },
    ],
  });

  /* ==========================
     드롭다운 동작 초기화
     ========================== */
  initializeDropdowns();
});

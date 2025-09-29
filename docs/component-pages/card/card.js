import "../../components/card/class-card.scss";
import { createClassCard } from "../../components/card/create-class-card.js";
import { createMembershipCard } from "../../components/card/create-membership-card.js";
import "../../components/card/membership-card.scss";
import "../../components/card/popover-common.js";
import "./card.scss";

/* ==========================
   회원권 카드 데이터
   - 멤버십 카드 전용 샘플 데이터
   ========================== */
export const memberships = [
  {
    id: "membership-card-basic--reserv-unused", // 고유 ID (DOM 마운트 타겟과 연결)
    folderName: "폴더 이름", // 회원권이 속한 폴더명
    membershipName: "회원권 | 예약 미사용", // 회원권 이름
    badge: "예약 미사용", // 뱃지 텍스트
    badgeVariant: "reserv-unused", // 뱃지 스타일 (ex. 사용/미사용 상태)
    info: "", // 이용 제한 정보 (ex. "일일 1회, 주간 7회")
    details: [
      // 가격/기간 옵션 리스트
      { period: "1개월", count: "10회", cancel: "", price: "카드 100,000원" },
    ],
    memo: "메모 내용", // 메모
    tickets: [], // 예약 가능한 수업 목록 (멤버십은 기본적으로 빈 배열)
    withCheckbox: false, // 카드에 체크박스 표시 여부
    checked: false, // 체크박스 초기 선택 상태
    popover: true, // 팝오버 사용 여부
  },
  {
    id: "membership-card-basic--reserv-used",
    folderName: "폴더 이름",
    membershipName: "회원권 | 예약 사용",
    badge: "예약 사용",
    badgeVariant: "reserv-used",
    info: ["일일 1회", "주간 7회", "동시 무제한 예약"],
    details: [
      {
        period: "3개월",
        count: "무제한",
        cancel: "취소 10회",
        price: "카드 300,000원",
      },
      {
        period: "3개월",
        count: "무제한",
        cancel: "취소 10회",
        price: "카드 296,000원",
      },
    ],
    memo: "",
    tickets: [
      {
        folderName: "폴더 이름",
        items: [
          "수업 이름 A",
          "수업 이름 B",
          "수업 이름 C",
          "수업 이름 D",
          "수업 이름 E",
          "수업 이름 F",
        ],
      },
      { folderName: "폴더 이름", items: ["수업 이름 A", "수업 이름 B"] },
    ],
    withCheckbox: false,
    checked: false,
    popover: true,
  },
  {
    id: "membership-card-basic--scroll",
    folderName: "폴더 이름",
    membershipName: "회원권 | 예약 사용 (스크롤)",
    badge: "예약 사용",
    badgeVariant: "reserv-used",
    info: ["일일 1회", "주간 7회", "동시 무제한 예약"],
    details: [
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "카드 100,000원",
      },
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "현금 100,000원",
      },
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "계좌이체 100,000원",
      },
      {
        period: "3개월",
        count: "30회",
        cancel: "취소 10회",
        price: "카드 300,000원",
      },
      {
        period: "3개월",
        count: "30회",
        cancel: "취소 10회",
        price: "현금 300,000원",
      },
      {
        period: "3개월",
        count: "30회",
        cancel: "취소 10회",
        price: "계좌이체 300,000원",
      },
    ],
    memo: "",
    tickets: [],
    withCheckbox: false,
    checked: false,
    popover: true,
  },
  {
    id: "membership-card-checkbox--standard",
    folderName: "폴더 이름",
    membershipName: "회원권 | 체크박스",
    badge: "예약 미사용",
    badgeVariant: "reserv-unused",
    info: "",
    details: [
      { period: "1개월", count: "10회", cancel: "", price: "카드 100,000원" },
    ],
    memo: "",
    tickets: [],
    withCheckbox: true, // 체크박스 버전
    checked: false,
    popover: false, // 팝오버는 열리지 않음
  },
  {
    id: "membership-card-checkbox--scroll",
    folderName: "폴더 이름",
    membershipName: "회원권 카드 | 체크박스 (스크롤)",
    badge: "예약 미사용",
    badgeVariant: "reserv-unused",
    info: "",
    details: [
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "카드 100,000원",
      },
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "현금 100,000원",
      },
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "계좌이체 100,000원",
      },
      {
        period: "1개월",
        count: "10회",
        cancel: "취소 3회",
        price: "미수금 100,000원",
      },
    ],
    memo: "",
    tickets: [],
    withCheckbox: true,
    checked: false,
    popover: false,
  },
];

/* ==========================
   수업 카드 데이터
   - 클래스 카드 전용 샘플 데이터
   ========================== */
export const classes = [
  {
    id: "class-card-basic--group",
    folderName: "폴더 이름",
    className: "수업 | 수업 이름 (그룹)",
    badge: "그룹",
    badgeVariant: "group",
    duration: "50분", // 수업 시간
    people: "10명", // 수강 인원
    trainer: "홍길동", // 담당 강사
    policyReserve: "수업 시작 7일 전 0시부터 30분 전까지", // 예약 정책
    policyCancel: "수업 시작 24시간 전까지", // 취소 정책
    memo: "메모 내용", // 메모
    notice:
      "안녕하세요. 다이어트 1:1 PT 오후반에 오신 걸 환영합니다! 회원님만을 위한 맞춤형 프로그램으로 건강한 변화를 함께 시작해요. 준비 운동부터 마무리 스트레칭까지 알차게 구성되어 있어요. 원활한 진행을 위해 수업 시작 5분 전까지 도착해 주세요. 운동화와 개인 타월은 꼭 챙겨 와 주세요!", // 수업 공지
    tickets: [{ folderName: "회원권 A", items: ["3개월권", "6개월권"] }], // 사용 가능한 회원권
    withCheckbox: false,
    checked: false,
    popover: true,
  },
  {
    id: "class-card-basic--personal",
    folderName: "폴더 이름",
    className: "수업 | 수업 이름 (개인)",
    badge: "개인",
    badgeVariant: "personal",
    duration: "50분",
    people: "1명",
    trainer: ["홍길동", "김길동"],
    policyReserve: "수업 시작 7일 전 0시부터 30분 전까지",
    policyCancel: "수업 시작 24시간 전까지",
    memo: "-",
    notice: "",
    tickets: [],
    withCheckbox: false,
    checked: false,
    popover: true,
  },
  {
    id: "class-card-checkbox",
    folderName: "폴더 이름",
    className: "수업 | 체크박스",
    badge: "개인",
    badgeVariant: "personal",
    duration: "50분",
    people: "1명",
    trainer: "홍길동",
    policyReserve: "수업 시작 7일 전 0시부터 30분 전까지",
    policyCancel: "수업 시작 24시간 전까지",
    memo: "",
    notice: "",
    tickets: [],
    withCheckbox: true,
    checked: false,
    popover: false,
  },
];

/* ==========================
   카드 렌더링 (데모용)
   - DOMContentLoaded 시점에 id와 매칭되는 DOM에 카드 삽입
   - createMembershipCard / createClassCard 함수 호출
   ========================== */
document.addEventListener("DOMContentLoaded", () => {
  // 멤버십 카드 렌더링
  memberships.forEach((m) => {
    const target = document.getElementById(m.id);
    if (target) {
      target.innerHTML = createMembershipCard(m);
      // data-id 부여 (팝오버, 선택 로직에서 사용)
      target.querySelector(".membership-card").dataset.id = m.id;
    }
  });

  // 수업 카드 렌더링
  classes.forEach((c) => {
    const target = document.getElementById(c.id);
    if (target) {
      target.innerHTML = createClassCard(c);
      // data-id 부여 (팝오버, 선택 로직에서 사용)
      target.querySelector(".class-card").dataset.id = c.id;
    }
  });
});

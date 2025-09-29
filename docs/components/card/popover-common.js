import { classes, memberships } from "../../component-pages/card/card.js";
import { createClassDetailPopover } from "./create-class-popover.js";
import { createMembershipDetailPopover } from "./create-membership-popover.js";

document.addEventListener("DOMContentLoaded", () => {
  let activeCard = null; // 현재 열려 있는 카드
  let activePopover = null; // 현재 열려 있는 팝오버 엘리먼트

  /**
   * 팝오버 열기
   * @param {HTMLElement} card - 클릭된 카드 엘리먼트
   * @param {string} type - "membership" | "class"
   */
  function openPopover(card, type) {
    // 이미 열려있던 팝오버 닫기
    closePopover();

    // 데이터 찾기 및 팝오버 HTML 생성
    let popoverHTML = "";
    if (type === "membership") {
      const data = memberships.find((m) => m.id === card.dataset.id);
      if (data) popoverHTML = createMembershipDetailPopover(data);
    } else if (type === "class") {
      const data = classes.find((c) => c.id === card.dataset.id);
      if (data) popoverHTML = createClassDetailPopover(data);
    }
    if (!popoverHTML) return;

    // DOM 삽입
    const wrapper = document.createElement("div");
    wrapper.innerHTML = popoverHTML.trim();
    const popoverEl = wrapper.firstElementChild;
    document.body.appendChild(popoverEl);

    // 팝오버 위치 계산 (requestAnimationFrame → 높이 안정화 후 위치 잡음)
    requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const scrollLeft = window.scrollX;
      const popoverWidth = 390;
      const popoverHeight = popoverEl.offsetHeight;

      // 화면의 중앙 기준으로 좌/우 배치 결정
      const isRight = rect.left + rect.width / 2 > window.innerWidth / 2;

      const left = isRight
        ? rect.left + scrollLeft - popoverWidth - 8 // 카드 왼쪽으로
        : rect.right + scrollLeft + 8; // 카드 오른쪽으로

      // 화면 하단 넘어가지 않도록 보정
      const rawTop = rect.top + scrollTop;
      const maxTop = scrollTop + window.innerHeight - popoverHeight - 8;
      const top = Math.min(rawTop, maxTop);

      // 최종 스타일 적용
      popoverEl.style.position = "absolute";
      popoverEl.style.left = `${Math.max(
        8,
        Math.min(left, window.innerWidth - popoverWidth - 8)
      )}px`;
      popoverEl.style.top = `${Math.max(8, top)}px`;
      popoverEl.style.zIndex = "1000";
      popoverEl.classList.add(isRight ? "left" : "right");
    });

    // 상태 업데이트
    activeCard = card;
    activePopover = popoverEl;
    card.classList.add("popover-is-active");

    // 팝오버 닫기 버튼 이벤트
    popoverEl.querySelector(".x-btn")?.addEventListener("click", closePopover);
  }

  /**
   * 팝오버 닫기
   */
  function closePopover() {
    if (activePopover) {
      activePopover.remove();
      activePopover = null;
    }
    document
      .querySelectorAll(
        ".membership-card.popover-is-active, .class-card.popover-is-active"
      )
      .forEach((c) => c.classList.remove("popover-is-active"));
    activeCard = null;
  }

  /**
   * 전역 클릭 이벤트 핸들러
   * - 카드 외부 클릭 시 → 팝오버 닫기
   * - 체크박스 모드 카드 클릭 시 → 체크박스 토글
   * - 일반 카드 클릭 시 → 팝오버 열기/닫기
   */
  document.addEventListener("click", (e) => {
    const membershipCard = e.target.closest(".membership-card");
    const classCard = e.target.closest(".class-card");

    // 1) 카드 외부 클릭 → 팝오버 닫기
    if (!membershipCard && !classCard) {
      if (!activePopover?.contains(e.target)) closePopover();
      return;
    }

    const card = membershipCard || classCard;
    const checkboxInput = card.querySelector('input[type="checkbox"]');

    // 2) 체크박스 모드 처리
    if (card.classList.contains("checkbox-mode")) {
      // (a) 체크박스 자체 클릭 시
      if (e.target === checkboxInput) {
        card.classList.toggle("is-selected", checkboxInput.checked);
        return;
      }

      // (b) 카드 아무 영역 클릭 시
      if (checkboxInput) {
        const newChecked = !checkboxInput.checked;
        checkboxInput.checked = newChecked;
        card.classList.toggle("is-selected", newChecked);
      }
      return; // 체크박스 모드에서는 팝오버 열지 않음
    }

    // 3) popover=false 옵션 카드 → 팝오버 열지 않음
    if (card.dataset.popover === "false") return;

    // 4) 같은 카드 다시 클릭 시 → 팝오버 닫기
    if (activeCard === card) {
      closePopover();
      return;
    }

    // 5) 새로운 카드 클릭 시 → 팝오버 열기
    openPopover(card, membershipCard ? "membership" : "class");
  });

  // 윈도우 리사이즈/스크롤 시 팝오버 닫기
  window.addEventListener("resize", closePopover);
  window.addEventListener("scroll", closePopover, { passive: true });
});

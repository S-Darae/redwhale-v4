// ===============================
// Dropdown Utility
// ===============================

// 모든 드롭다운 닫기
export function closeAllDropdowns(exceptMenu = null) {
  document.querySelectorAll(".dropdown__menu.visible").forEach((menu) => {
    if (exceptMenu && menu === exceptMenu) return; // 현재 열려고 하는 메뉴는 닫지 않음
    hideMenu(menu);
  });
  document.querySelectorAll("[aria-expanded='true']").forEach((toggle) => {
    const controls = toggle.getAttribute("aria-controls");
    if (exceptMenu && controls === exceptMenu.id) return;
    toggle.setAttribute("aria-expanded", "false");
  });
}

// 메뉴 닫기 처리
function hideMenu(menu) {
  menu.classList.remove("visible");
  menu.classList.remove("drop-up", "drop-left", "drop-right");

  // body 포탈로 나간 경우 → 다시 원래 .dropdown 안으로 돌려놓기
  if (menu.dataset.portal === "true" && menu.parentElement === document.body) {
    const toggle = document.querySelector(
      `[data-dropdown-target="${menu.id}"], .dropdown__toggle[aria-controls="${menu.id}"]`
    );
    if (toggle) {
      const wrapper = toggle.closest(".dropdown");
      if (wrapper) {
        wrapper.appendChild(menu); // 제자리 복귀
      }
    }
    menu.dataset.portal = "false";
    menu.dataset.portalAppended = "";
    menu.style.position = ""; // 초기화
    menu.style.top = "";
    menu.style.left = "";
  }
}

// 개별 초기화
export function initializeDropdown(dropdown) {
  if (!dropdown || dropdown.dataset.initialized === "true") return;
  dropdown.dataset.initialized = "true";

  const toggle = dropdown.querySelector(
    ".dropdown__toggle, .text-field__select-toggle"
  );
  const menu = dropdown.querySelector(".dropdown__menu");

  if (toggle && menu) {
    bindToggleWithMenu(toggle, menu);
  }
}

// ===============================
// 외부 토글 지원 (data-dropdown-target)
// ===============================
function initializeExternalToggles() {
  document.querySelectorAll("[data-dropdown-target]").forEach((toggle) => {
    const targetId = toggle.dataset.dropdownTarget;
    const menu = document.getElementById(targetId);
    if (menu) bindToggleWithMenu(toggle, menu);
  });
}

// ===============================
// 모달 내부 여부 확인
// ===============================
function isInModal(el) {
  return !!el.closest(".modal-overlay");
}

// ===============================
// Toggle + Menu 바인딩 함수
// ===============================
function bindToggleWithMenu(toggle, menu) {
  if (!toggle || !menu || toggle.dataset.bound === "true") return;
  toggle.dataset.bound = "true";

  // 아이콘 전용 토글 여부 확인
  const isIconOnly =
    toggle.classList.contains("btn--icon-only") || toggle.querySelector("i");

  if (!isIconOnly) {
    const initialText = toggle.textContent.trim();
    const placeholder = initialText || "옵션 선택";
    toggle.dataset.placeholder = placeholder;

    // 초기화: selected 있으면 반영, 없으면 defaultValue → 없으면 placeholder
    const selectedItem = menu.querySelector(".dropdown__item.selected");
    if (selectedItem) {
      const value =
        selectedItem.dataset.value || selectedItem.textContent.trim();
      toggle.textContent = value;
      toggle.classList.remove("is-placeholder");
    } else if (toggle.dataset.defaultValue) {
      toggle.textContent = toggle.dataset.defaultValue;
      toggle.classList.remove("is-placeholder");
    } else {
      toggle.textContent = placeholder;
      toggle.classList.add("is-placeholder");
    }
  }

  // 클릭 이벤트 → 열기/닫기
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    if (expanded) {
      // 이미 열려 있으면 닫기
      toggle.setAttribute("aria-expanded", "false");
      hideMenu(menu);
      return;
    }

    // 다른 드롭다운 닫기
    closeAllDropdowns(menu);

    // 새로 열기
    toggle.setAttribute("aria-expanded", "true");

    const insideModal = isInModal(toggle);
    if (insideModal) {
      // 모달 내부 → body 포탈
      if (menu.parentElement !== document.body) {
        document.body.appendChild(menu);
        menu.dataset.portal = "true";
        menu.dataset.portalAppended = "true";
      }
    }

    // 위치 보정 실행
    positionMenuNearToggle(toggle, menu);

    menu.classList.add("visible");

    // 선택된 항목 스크롤 보정
    const selected = menu.querySelector(
      ".dropdown__item.selected, .dropdown__item.checked"
    );
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  });

  // 메뉴 아이템 클릭 or 체크박스 변경 → 처리
  if (menu.querySelector("input[type='checkbox']")) {
    menu.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        updateCheckboxToggleText(toggle, menu);
      });
    });
  } else if (!isIconOnly) {
    menu.querySelectorAll(".dropdown__item").forEach((item) => {
      item.addEventListener("click", () => {
        const value = item.dataset.value || item.textContent.trim();
        const placeholder = toggle.dataset.placeholder || "옵션 선택";

        if (value && value !== placeholder) {
          toggle.textContent = value;
          toggle.classList.remove("is-placeholder");
        } else {
          toggle.textContent = placeholder;
          toggle.classList.add("is-placeholder");
        }

        menu
          .querySelectorAll(".dropdown__item.selected")
          .forEach((el) => el.classList.remove("selected"));
        item.classList.add("selected");

        toggle.setAttribute("aria-expanded", "false");
        hideMenu(menu);

        toggle.dispatchEvent(
          new CustomEvent("dropdown:change", {
            detail: { value },
            bubbles: true,
          })
        );
      });
    });
  }
}

// ===============================
// 체크박스 토글 텍스트 업데이트
// ===============================
function updateCheckboxToggleText(toggle, menu) {
  const checkedItems = Array.from(
    menu.querySelectorAll("input[type='checkbox']:checked")
  ).map((c) => {
    const label = menu.querySelector(`label[for="${c.id}"]`);
    return label ? label.textContent : c.value;
  });

  if (checkedItems.length === 0) {
    toggle.textContent = toggle.dataset.placeholder || "옵션 선택";
    toggle.classList.add("is-placeholder");
  } else if (checkedItems.length === 1) {
    toggle.textContent = checkedItems[0];
    toggle.classList.remove("is-placeholder");
  } else {
    toggle.textContent = `${checkedItems[0]} 외 ${checkedItems.length - 1}개`;
    toggle.classList.remove("is-placeholder");
  }
}

// ===============================
// 전역 초기화
// ===============================
export function initializeDropdowns() {
  document.querySelectorAll(".dropdown").forEach(initializeDropdown);
  initializeExternalToggles();

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown__menu.visible").forEach((menu) => {
      const toggle = document.querySelector(
        `[data-dropdown-target="${menu.id}"], .dropdown__toggle[aria-controls="${menu.id}"]`
      );
      if (
        toggle &&
        (toggle.contains(event.target) || menu.contains(event.target))
      )
        return;

      toggle?.setAttribute("aria-expanded", "false");
      hideMenu(menu);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });
}

// ===============================
// 아이템 전체 클릭 → 체크박스 토글
// ===============================
document.addEventListener("click", (e) => {
  const item = e.target.closest(".dropdown__menu .dropdown__item");
  if (item) {
    const checkbox = item.querySelector("input[type=checkbox]");
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
});

// ===============================
// 메뉴 위치 보정
// ===============================
function positionMenuNearToggle(toggle, menu) {
  const rect = toggle.getBoundingClientRect();

  // 높이 측정 위해 잠시 보이게
  menu.style.visibility = "hidden";
  menu.classList.add("visible");

  const menuHeight = menu.offsetHeight || 200;

  menu.style.position = "absolute";

  // variant 구분 - tailing-select 은 SCSS에서 지정한 너비/정렬 유지
  if (!toggle.closest(".text-field--tailing-select")) {
    menu.style.left = `0`;
  }

  const spaceBelow = window.innerHeight - rect.bottom;
  if (spaceBelow < menuHeight) {
    // 아래 공간 부족 → 위로 열기
    menu.style.top = `-${menuHeight + 4}px`;
    menu.classList.add("drop-up");
  } else {
    // 기본: 아래로 열기
    menu.style.top = `${toggle.offsetHeight + 4}px`;
    menu.classList.remove("drop-up");
  }

  // 체크된 항목 자동 스크롤 (기존 기능)
  const selectedItem = menu.querySelector(".dropdown__item.selected");
  if (selectedItem) {
    menu.scrollTop =
      selectedItem.offsetTop -
      menu.clientHeight / 2 +
      selectedItem.clientHeight / 2;
  }

  // 측정 끝 → 다시 보이게
  menu.style.visibility = "visible";
}
